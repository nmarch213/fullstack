const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // The then statement is a promise that will run once the mongodb has ran
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // Already have a record with this userSchema
        return done(null, existingUser);
      }
      // Only creates new user if not previously added
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
