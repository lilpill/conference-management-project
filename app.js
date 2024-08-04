const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { sequelize, User, Conference, Paper } = require('./models');
const { generateToken, authenticate } = require('./auth');

const app = express();
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, role });
  res.json({ user, token: generateToken(user) });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ token: generateToken(user) });
  } else {
    res.status(401).send('Invalid credentials.');
  }
});

app.post('/conferences', authenticate, async (req, res) => {
  const conference = await Conference.create(req.body);
  res.json(conference);
});

app.get('/conferences', authenticate, async (req, res) => {
  const conferences = await Conference.findAll();
  res.json(conferences);
});

app.get('/conferences/:id', authenticate, async (req, res) => {
  const conference = await Conference.findByPk(req.params.id);
  res.json(conference);
});

app.put('/conferences/:id', authenticate, async (req, res) => {
  const conference = await Conference.findByPk(req.params.id);
  await conference.update(req.body);
  res.json(conference);
});

app.delete('/conferences/:id', authenticate, async (req, res) => {
  const conference = await Conference.findByPk(req.params.id);
  await conference.destroy();
  res.sendStatus(204);
});

app.post('/papers', authenticate, async (req, res) => {
  const paper = await Paper.create({ ...req.body, authorId: req.user.id });
  res.json(paper);
});

app.get('/papers', authenticate, async (req, res) => {
  const papers = await Paper.findAll();
  res.json(papers);
});

app.get('/papers/:id', authenticate, async (req, res) => {
  const paper = await Paper.findByPk(req.params.id);
  res.json(paper);
});

app.put('/papers/:id', authenticate, async (req, res) => {
  const paper = await Paper.findByPk(req.params.id);
  await paper.update(req.body);
  res.json(paper);
});

app.delete('/papers/:id', authenticate, async (req, res) => {
  const paper = await Paper.findByPk(req.params.id);
  await paper.destroy();
  res.sendStatus(204);
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on port ${port}`);
});
