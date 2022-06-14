const express = require('express');
const db = require('./models/index');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

app.use(helmet());
// Configuration des headers CORS pour autoriser l'accès multi-origines
app.use(
  cors({
    origin: process.env.FRONTEND_URL_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
app.use(cookieParser());

// Gestionnaire servant à lire le contenu de la requête
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

db.sequelize.sync();

module.exports = app;
