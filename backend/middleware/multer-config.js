const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image.gif': 'gif',
  'image.webp': 'webp',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // destination des images
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    // nouveau nom du fichier image pour éviter les doublons
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    if (
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/gif' &&
      file.mimetype !== 'image/webp'
    ) {
      callback(new Error('type de fichier non valide'));
    } else {
      callback(null, name + Date.now() + '.' + extension);
    }
  },
});

module.exports = multer({ storage }).single('image');
