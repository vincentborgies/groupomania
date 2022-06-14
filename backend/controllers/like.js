const models = require('../models');

exports.likePost = async (req, res, next) => {
  const { isAdmin, userId } = req.body.authContext;
  try {
    const postId = req.params.id;
    const existingLike = await models.Like.findOne({
      where: { author: userId, post_id: postId },
    });
    if (existingLike) {
      await models.Like.destroy(
        { where: { author: userId, post_id: postId } },
        { truncate: true, restartIdentity: true }
      );
      res.status(200).send({ messageRetour: "Vous n'aimez plus ce post" });
    } else {
      await models.Like.create({
        author: userId,
        post_id: postId,
      });
      res.status(201).json({ messageRetour: 'Vous aimez ce post' });
    }
  } catch (error) {
    return res.status(400).send({ error });
  }
};
