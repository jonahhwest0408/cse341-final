const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movies');
const recommendationRoutes = require('./routes/recommendations');
const reviewRoutes = require('/routes/reviews');

const app = express();


// Middleware
app.use(express.json());

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
      ],
    },
    apis: [
      './routes/userRoutes.js', 
      './routes/movies.js',
      './routes/recommendations.js'
    ],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', userRoutes); 
app.use('/api', movieRoutes);
app.use('/api', recommendationRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
