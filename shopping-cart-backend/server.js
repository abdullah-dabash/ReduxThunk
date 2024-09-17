const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { db } = require('./config');

const app = express();
const pool = new Pool(db); 

app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

pool.connect()
  .then(client => {
    console.log('Connected to the database');
    client.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack);
  });

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
