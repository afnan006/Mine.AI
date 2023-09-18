const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '299099522450-9n5n2o3fvsqucml8uvpq0k62jd8qjij4.apps.googleusercontent.com', // Replace with your Google OAuth client ID
    clientSecret: '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', // Replace with your Google OAuth client secret
    callbackURL: 'https://your-website.com/auth/google/callback', // Replace with your actual callback URL
  },
  (accessToken, refreshToken, profile, done) => {
    try {
      // You can handle the user's profile and authentication here
      // For example, you can save the user to your database
      // or perform other actions based on the authentication result

      // In this example, we simply return the user's profile data
      return done(null, profile);
    } catch (error) {
      return done(error, false);
    }
  }
));

module.exports = passport;
