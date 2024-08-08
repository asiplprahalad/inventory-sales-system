const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/items');
const billRoutes = require('./routes/bills');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/inventory_sales', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/items', itemRoutes);
app.use('/api/bills', billRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));