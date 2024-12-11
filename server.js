const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;


dotenv.config();

const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movies');
const recommendationRoutes = require('./routes/recommendations');
const reviewRoutes = require('./routes/reviews');
const bodyParser = require('body-parser');

const app = express();


// Middleware
app.use(express.json());
app.use(bodyParser.json());
app
  .use (session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/', require('./routes/index'))

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }))

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0', 
      info: {
        title: 'Movie API',
        version: '1.0.0',
        description: 'API for managing movies in the system',
      },
      tags: [
        {
          name: 'Users',
          description: 'Operations related to users',
        },
        {
          name: 'Movies',
          description: 'Operations related to movies'
        },
        {
          name: 'Recommendations',
          description: 'Operations related to recommendations'
        },
        {
          name: 'Reviews',
          description: 'Operations related to reviews'
        },
      ],
    },
    apis: [
      './routes/userRoutes.js', 
      './routes/movies.js',
      './routes/recommendations.js',
      './routes/reviews.js'
    ],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', userRoutes); 
app.use('/api', movieRoutes);
app.use('/api', recommendationRoutes);
app.use('/api', reviewRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
