const models = require('../models');

// Création d'un Post //
exports.createPost = (req, res, next) => {
  const { isAdmin, userId } = req.body.authContext;

  models.User.findOne({ where: { id: userId } })
    .then((user) => {
      const post = {
        title: req.body.title,
        content: req.body.content,
        media_url: req.file
          ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
          : req.body.mediaUrl,
        author: userId,
        author_name: user.firstname + ' ' + user.lastname,
        author_photo: user.photo,
      };

      models.Post.create(post)
        .then(() => res.status(201).json({ message: 'Post created' }))
        .catch((error) =>
          res.status(400).json({ error: 'impossible de créér le post' })
        );
    })
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'un Post //
exports.deletePost = (req, res, next) => {
  const { isAdmin, userId } = req.body.authContext;

  if (!req.params.id) {
    res.status(400).json({ error: 'Missing information' });
  }

  const deletePost = async () =>
    models.Post.destroy({ where: { id: req.params.id } })
      .then((post) => {
        if (!post) {
          res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({
          message: 'Le post a bien été supprimé',
        });
      })
      .catch((error) => res.status(404).json({ error }));

  if (isAdmin) {
    return deletePost();
  }

  models.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.author !== userId) {
        return res
          .status(403)
          .json({ error: 'You are not allowed to delete this post' });
      }
      deletePost();
    })
    .catch((error) =>
      res.status(400).json({ error: 'This post does not exist' })
    );
};

//Obtention de tous les posts du plus récent au plus ancien
exports.getAllPosts = (req, res, next) => {
  models.Post.findAll({
    include: [
      {
        model: models.Comment,
      },
      {
        model: models.Like,
      },
    ],
    limit: 10,
  })
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) =>
      res.status(400).json({ error: 'impossible de récupérer les posts' })
    );
};

//Modification d'un post
exports.updatePost = (req, res, next) => {
  const { isAdmin, userId } = req.body.authContext;

  models.Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      const hasAccess = post.author === userId;

      if (!hasAccess) {
        res.status(403).json('restricted access');
      }

      const newTitle = req.body.title;
      const newContent = req.body.content;
      const newImage = req.body.mediaUrl;

      newTitle && (post.title = newTitle);
      newContent && (post.content = newContent);
      newImage && (post.media_url = newImage);
      console.log('test');

      post
        .save()
        .then(() =>
          res.status(201).json({ message: 'Post updated successfully' })
        )
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(404).json({ error: 'Post not found' }));
};

exports.getPostByUser = (req, res, next) => {
  models.Post.findAll({ where: { author: req.params.userid } })
    .then((posts) => {
      posts && res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error: 'Aucun post pour cet utilisateur' });
    });
};
