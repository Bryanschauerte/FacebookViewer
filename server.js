var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require("passport-facebook").Strategy;
var app = express();
//profile-viewer
var port = 8883;
var token = require('./hidden.js');




//sesssion middleware
app.use(session({secret: "BananaMonk"}));

//init passport
app.use(passport.initialize());
//use passport seesion
app.use(passport.session());


//definin gthe facebook session

passport.use(new FacebookStrategy({
  //client id  is the app id
  clientID: token.appId,

  //never put this on github
  clientSecret: token.appSecret,
  callbackURL: 'http://localhost:8883/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {

  console.log("token", token);
  console.log("profile", profile);

  //done added later
  return done(null, profile);
}));






app.get('/auth/facebook/', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',passport.authenticate('facebook', {
  failureRedirect: '/login', successRedirect: '/me' }),
function(req, res){
    console.log(req.session);
  });

  app.get('/me', function(req, res){
    res.send(req.user);
    console.log(req.user)
  });





  passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});





app.listen(port, function(){
  console.log("listening on port: " + port);
});
