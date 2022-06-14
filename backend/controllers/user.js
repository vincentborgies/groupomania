const models = require('../models');
const fs = require('fs');
// Suppression d'un compte //
exports.deleteUser = (req, res, next) => {
  models.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      const filename = user.photo.split('/uploads/')[1];
      fs.unlink(`uploads/${filename}`, () => {
        models.User.destroy({ where: { id: req.params.id } })
          .then(() =>
            res
              .status(200)
              .json({ message: 'Votre compte a bien été supprimé !' })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modification d'un compte //
exports.updateUser = (req, res, next) => {
  const { isAdmin, userId } = req.body.authContext;

  models.User.findOne({ where: { id: userId } })
    .then((user) => {
      const hasAccess = user.id === userId;

      if (!hasAccess) {
        res.status(403).json({ error: 'accès restreint' });
      } else {
        req.body.firstname && (user.firstname = req.body.firstname);
        req.body.lastname && (user.lastname = req.body.lastname);
        user.save({ fields: ['firstname', 'lastname'] });
        req.body.email &&
          models.User.findOne({ where: { email: req.body.email } })
            .then((userFoundByEmail) => {
              if (!userFoundByEmail) {
                user.email = req.body.email;
                user
                  .save({ fields: ['email'] })
                  .then(() =>
                    res
                      .status(201)
                      .json({ message: 'Informations modifiées avec succès' })
                  )
                  .catch((error) => res.status(404).json({ error }));
              } else if (userFoundByEmail.id === userId) {
                user.email = req.body.email;
                user
                  .save({ fields: ['email'] })
                  .then(() =>
                    res
                      .status(201)
                      .json({ message: 'Informations modifiées avec succès' })
                  )
                  .catch((error) => res.status(404).json({ error }));
              } else {
                res.status(403).json({
                  message:
                    'cet email est déjà pris, veuillez en choisir un autre',
                });
              }
            })
            .catch((error) => res.status(404).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));

  models.Post.findAll({ where: { author: userId } }).then((posts) => {
    if (posts) {
      posts.forEach((post) => {
        if (
          (req.body.lastname && req.body.firstname) ||
          req.body.lastname ||
          req.body.firstname
        ) {
          post.author_name = req.body.firstname + ' ' + req.body.lastname;
          post.save({ fields: ['author_name'] });
        }
      });
    }
  });

  models.Comment.findAll({ where: { author: userId } }).then((comments) => {
    if (comments) {
      comments.forEach((comment) => {
        if (
          (req.body.lastname && req.body.firstname) ||
          req.body.lastname ||
          req.body.firstname
        ) {
          comment.author_name = req.body.firstname + ' ' + req.body.lastname;
          comment.save({ fields: ['author_name'] });
        }
      });
    }
  });
};

exports.getUserInfos = (req, res) => {
  models.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      !user &&
        res.status(400).json({ message: "cet utilisateur n'existe pas" });
      const userInfos = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        photo: user.photo,
      };

      res.status(200).json({ userInfos });
    })
    .catch((err) => {
      res.status(400).json({ error });
    });
};
