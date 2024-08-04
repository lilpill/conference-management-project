const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const conferenceRoutes = require('./routes/conferenceRoutes');
const paperRoutes = require('./routes/paperRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/conferences', conferenceRoutes);
app.use('/papers', paperRoutes);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on port ${port}`);
});
