var express = require("express");
var app = express();
var basicAuth = require('basic-auth');
 
var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === 'user' && user.pass === '123456') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}
 
app.get("/auth", auth, function (req, res) {
    res.send("Autenticado!")
});
 
app.listen(4000);
console.log("app running on localhost:4000");