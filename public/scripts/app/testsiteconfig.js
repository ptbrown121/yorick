// Includes file dependencies
define([
], function () {
    var karmaClient = (typeof window !== "undefined" && window.__karma__ && window.__karma__.config) ?
        window.__karma__.config : {};

    var ConfigLocalTest = {
        serverURL: karmaClient.testServerURL || "http://localhost:1337/parse",
        facebookAppId: "1606746326305984",
        redirect_uri: "http://localhost/index.html",
        SAMPLE_TROUPE_ID: karmaClient.testSampleTroupeId || "k7zf9B7bwV"
    };

    return ConfigLocalTest;

});
