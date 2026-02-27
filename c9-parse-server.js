var express = require('express'),
    serveStatic = require('serve-static'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    bodyParser = require('body-parser'),
    ipn = require('paypal-ipn'),
    ParseServer = require('parse-server').ParseServer,
    Parse = require('parse/node'),
    cors = require('cors');

var app = express();
app.use(cors());
app.use(serveStatic(process.env.PUBLIC_BASE));

var settings = require(process.env.CONFIG_FILE);
console.log(settings);
var mountPath = settings.mountPath || '/parse/1';

Parse.initialize(settings.appId);
Parse.masterKey = settings.masterKey;
Parse.serverURL = settings.serverURL || ('http://127.0.0.1:8080' + mountPath);

app.get('/deez', function (req, res) {
    new Parse.Query("Vampire").first({useMasterKey: true}).then(function (v) {
        res.send("I got something named what exactly? " + v.get("name"));
    }).fail(function (error) {
        res.send(error.message);
    });
});

async function start() {
    var api = new ParseServer(settings);
    await api.start();
    app.use(mountPath, api.app);
    http.createServer(app).listen(8080, '0.0.0.0');
}

start().catch(function (error) {
    console.error(error);
    process.exit(1);
});
