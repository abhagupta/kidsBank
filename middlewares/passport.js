var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');

  module.exports = function(app) {
    var passport = app.passport;

     // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
    	console.log("test serialize");
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
    	console.log("test");
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


 passport.use('local-signup', new LocalStrategy({
 	      usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
  function(req, username, password, done) {
  	   console.log("username :" + username);

  	process.nextTick(function() {
  	   console.log("username :" + username);
  	   var user = new User()
  			//user.email = email
  		user.username = username;
  	   return done(null, user);

     });
  //   User.findOne({ username: username }, function(err, user) {
  //     if (err) { return done(err); }
      
  //     	var user = new User()
  //       user.email = email
  //       user.username = username
		// return done(null, user);
  //     }
      
  //   );
  }
));

passport.use(new GoogleStrategy({

        clientID        : '902993661757-lan8renhm0lc8iop7ottgej9to5pasqr.apps.googleusercontent.com',
        clientSecret    : 'wCDhyozEd9-s92zsJkHSP6uh',
        callbackURL     : 'http://127.0.0.1:5000/auth/google/callback',

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

          console.log("reached here");

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }
));

}




