const models = require('../models');
const user = require('../models/user');

//Création d'un commentaire
exports.createComment = (req, res) => {
  const { isAdmin, userId } = req.body.authContext;
  const postId = req.params.id;

  models.User.findOne({ where: { id: userId } }).then((user) => {
    const comment = {
      post_id: postId,
      author: userId,
      author_name: user.firstname + ' ' + user.lastname,
      author_photo: user.photo,
      content: req.body.content,
    };

    models.Post.findOne({ where: { id: postId } })
      .then((post) => {
        models.Comment.create(comment)
          .then(() =>
            res.status(201).json({ post: 'Commentaire crée avec succès' })
          )
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) =>
        res.status(400).json({
          error:
            "Vous essayez de créer un commentaire sur un post qui n'existe pas",
        })
      );
  });
};

// Suppression d'un commentaire //
exports.deleteComment = (req, res, next) => {
  const { isAdmin, userId } = req.body.authContext;
  const commentId = req.params.commentid;

  if (!commentId) {
    res.status(400).json({ error });
  }

  const deleteComment = async () =>
    models.Comment.destroy({ where: { id: commentId } })
      .then(() =>
        res.status(200).json({
          message: 'Ce commentaire a été supprimé',
        })
      )
      .catch((error) => res.status(404).json({ error }));

  if (isAdmin) {
    return deleteComment();
  }

  models.Comment.findOne({ where: { id: commentId } })
    .then((comment) => {
      if (userId !== comment.author) {
        return res.status(403).json({
          error: "Vous n'êtes pas autorisé à supprimer ce commentaire",
        });
      }
      deleteComment();
    })
    .catch((error) => res.status(400).json({ error }));
};
