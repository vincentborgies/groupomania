const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userControl = require('../controllers/user');
const authControl = require('../controllers/auth');

router.post('/signup', multer, authControl.signup);
router.post('/login', authControl.login);
router.get('/logout', authControl.logout);

router.delete('/:id', auth.verifyJWT, userControl.deleteUser);
router.put('/:id', auth.verifyJWT, userControl.updateUser);
router.get('/:id', auth.verifyJWT, userControl.getUserInfos);

module.exports = router;
