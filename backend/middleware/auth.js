const jwt = require('jsonwebtoken');

module.exports.verifyJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).json({ error: 'accès non autorisé' });
  }
  try {
    const { isAdmin, userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.body.authContext = { isAdmin, userId };
    return next();
  } catch {
    return res.status(403).json({ error: 'accès non autorisé' });
  }
};