const functions = require('firebase-functions');
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const cors = require('cors')({ origin: true });
admin.initializeApp(functions.config().firebase);


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