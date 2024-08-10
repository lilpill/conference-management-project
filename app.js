require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const conferenceRoutes = require('./routes/conferenceRoutes');
const paperRoutes = require('./routes/paperRoutes');

const app = express();
app.use(bodyParser.json());

// Συνδεση με τη βάση δεδομένων MongoDB
mongoose.connect(process.env.MONGO_URI, {
  autoIndex: true
})
  .then(() => console.log('Πραγματοποιήθηκε σύνδεση στο MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/users', userRoutes);
app.use('/conferences', conferenceRoutes);
app.use('/papers', paperRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
