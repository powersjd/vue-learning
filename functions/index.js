const functions = require('firebase-functions');
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const cors = require('cors')({ origin: true });
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.GetAllUsers = functions.https.onRequest(async (req, res) => {
    function listAllUsers(nextPageToken) {
        admin.auth().listUsers(1000, nextPageToken)
        .then(function(listUsersResult) {
            res.status(200).send(listUsersResult)
        })
    }
    listAllUsers();
})

exports.UpdateClaims = functions.https.onRequest(async (req, res) => {
    await admin.auth().getUserByEmail(req.query.email)
    .then(async (user) => {
         admin.auth().setCustomUserClaims(user.uid, {
            admin: req.query.admin,
            moderator: req.query.moderator,
            user: req.query.user
        })
        let rolesRef = db.collection('roles').doc(user.uid)
        let updateUser = await rolesRef.update(
            {
                role : {
                    admin: req.query.admin,
                    moderator: req.query.moderator,
                    user: req.query.user
                }
            })
    })
    .catch((err) => {
        console.log(err)
    })
    res.status(200).send('Update successful!')
})

exports.AddNewUser = functions.auth.user().onCreate(async (authUser) => {
    if(authUser.email) {
        const customClaims = {
            user: true,
            moderator: false,
            admin: false
        }
        try {
            var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)

            return db.collection("roles").doc(authUser.uid).set({
                email: authUser.email,
                role: customClaims
            })
        } catch (err) {
            console.log(err)
        }
    }
})

exports.safeimage = functions.https.onRequest(async (req, res) => {

    const bucketName = 'jacoblearnstuff.appspot.com/images';
    const imageName = req.query.image;

    const [result] = await client.safeSearchDetection(
        `gs://${bucketName}/${imageName}`
    )
    const detections = result.safeSearchAnnotation;
    res.status(200).send({
        "Adult": detections.adult,
        "Spoof": detections.spoof,
        "Medical": detections.medical,
        "Violence": detections.violence,
        "Racy": detections.racy
    })
})

exports.ping = functions.https.onRequest(async (req, res) => {
    res.status(200).send("Everything cool")
})