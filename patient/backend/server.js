const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const patientRoutes = require('./routes/patients');
const exerciseRoutes = require('./routes/exercises');
const sessionRoutes = require('./routes/sessions');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/sessions', sessionRoutes);

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// For any other route, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
