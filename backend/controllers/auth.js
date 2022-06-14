const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();

// Fonction signup, sauvegarde d'un nouvel utilisateur //
exports.signup = (req, res, next) => {
  //Params
  const userObject = JSON.parse(req.body.userData);
  const { firstname, lastname, email, password } = userObject;
  const photo =
    req.file &&
    `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log(userObject);

  models.User.findOne({
    attributes: ['email'],
    where: { email: email },
  })
    .then((user) => {
      console.log('test');
      if (!user) {
        bcrypt.hash(password, 10).then((hash) => {
          const newUser = models.User.create({
            firstname,
            lastname,
            email,
            password: hash,
            photo,
            is_admin: 0,
          })
            .then((newUser) => {
              console.log('test');
              res.status(201).json({
                message: 'Utilisateur créé avec succès',
                userId: newUser.id,
              });
            })
            .catch((error) => {
              res.status(401).json({
                error:
                  'impossible de créer le compte, vérifiez que vous avez rempli les informations correctement',
              });
            });
        });
      } else {
        return res
          .status(403)
          .json({ error: 'cet email correspond déjà à un utlisateur' });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// Fonction login, connection d'un utilisateur//
exports.login = (req, res, next) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      const userData = {
        userId: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        photo: user.photo,
        isAdmin: user.is_admin,
      };
      if (!user) {
        return res
          .status(401)
          .json({ error: "Aucun compte n'a été trouvé avec cet email" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
          }
          const token = jwt.sign(
            { userId: user.id, isAdmin: user.is_admin },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
          );
          return res
            .cookie('jwt', token, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly:true,
            })
            .status(200)
            .json({
              message: `connecté avec succès en tant que ${
                user.firstname + ' ' + user.lastname
              }`,
              userData,
              token,
            });
        })
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) =>
      res.status(404).json({ error: "Cet utilisateur n'existe pas" })
    );
};

exports.logout = (req, res, next) => {
  res.clearCookie('jwt', { httpOnly: true });
  return res.status(200).json({ message: 'vous êtes bien déconnecté' });
};
