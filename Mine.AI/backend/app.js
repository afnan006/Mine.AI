const express = require('express');
const session = require('express-session');
const passport = require('./auth'); // Replace with the correct path to your auth.js file
const app = express();

// Configure express-session
app.use(session({
  secret: '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', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Define your authentication routes
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'], // Add the desired scopes
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect('/dashboard'); // Redirect to a dashboard page
  }
);

// Define your other routes and middleware as needed
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Start your Express.js server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
