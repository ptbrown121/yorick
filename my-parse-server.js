var express = require('express'),
    serveStatic = require('serve-static'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    bodyParser = require('body-parser'),
    ipn = require('paypal-ipn'),
    ParseServer = require('parse-server').ParseServer,
    Parse = require('parse/node');

var app = express()
var settings = require(process.env.CONFIG_FILE);
var mountPath = settings.mountPath || '/parse/1';

Parse.initialize(settings.appId);
Parse.masterKey = settings.masterKey;
Parse.serverURL = settings.serverURL || ('http://127.0.0.1:1337' + mountPath);

app.get('/deez', function (req, res) {
    new Parse.Query("Vampire").first({useMasterKey: true}).then(function (v) {
        res.send("I got something named what exactly? " + v.get("name"));
    }).fail(function (error) {
        res.send(error.message);
    });
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/deez', function (req, res) {
    console.log(JSON.stringify(req.body));
    ipn.verify(req.body, {allow_sandbox: true}, function (err, msg) {
        if (err) {
            console.error(err);
        } else {
            console.log("I verified it");
            var PaymentPaypal = Parse.Object.extend("PaymentPaypal");
            var p = new PaymentPaypal;
            p.save(req.body, {useMasterKey: true}).then(function (newpaymente) {
                console.log("Boom new payment");
            }).fail(function (error) {
                console.error(error.message);
            })
        }
    })
    res.send("I found something");
});

async function start() {
    var api = new ParseServer(settings);
    await api.start();
    app.use(mountPath, api.app);
    http.createServer(app).listen(1337, '0.0.0.0');
}

start().catch(function (error) {
    console.error(error);
    process.exit(1);
});
