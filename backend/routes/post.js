const express = require('express');
const router = express.Router();

const postControl = require('../controllers/post');
const commentControl = require('../controllers/comment');
const likeControl = require('../controllers/like');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth.verifyJWT, multer, postControl.createPost);
router.delete('/:id', auth.verifyJWT, postControl.deletePost);
router.get('/', auth.verifyJWT, postControl.getAllPosts);
router.put('/:id', auth.verifyJWT, postControl.updatePost);

router.post(
  '/:id/comments',
  auth.verifyJWT,
  multer,
  commentControl.createComment
);
router.delete(
  '/:id/comments/:commentid',
  auth.verifyJWT,
  commentControl.deleteComment
);

router.post('/:id/likes', auth.verifyJWT, likeControl.likePost);

module.exports = router;
