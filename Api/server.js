var express = require('express');
var bodyParser = require('body-parser')
var math = require('mathjs');
var app = express();

const port = 8081;

const evalExpr = (formula) => {
    if (!formula) {
        return false;
    }

    try {
        math.eval(formula);
        return true;
    } catch(e) {
        return false;
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/', function (req, res) {
    const formula = req.body.formula;
    
    console.log('Received POST request');
    console.log('Formula: ' + formula);

    const evalExpResult = evalExpr(formula);
    console.log('Formula is ' + (evalExpResult ? 'OK' : 'not OK'));

    res.writeHead((evalExpResult ? 200 : 400), { "Content-Type": "text/json" });
    res.end(JSON.stringify(evalExpResult));
});

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server listening on port " + port + "...");
})