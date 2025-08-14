require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts');

const app = express();

// Middleware
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's origin
  credentials: true
}));

// Routes
app.use('/posts', postRoutes);

// MongoDB connection
const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));