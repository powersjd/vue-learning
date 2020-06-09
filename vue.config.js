module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: 'https://us-central1-jacoblearnstuff.cloudfunctions.net/'
    }
};
