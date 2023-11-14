const { body } = require('express-validator');
const path = require('path');
const { lanquage } = require('../../locales/fa');

function imageValidator() {
      return [
            body('image').custom((value, { req }) => {
                  if (Object.keys(req.file).length == 0) throw lanquage.user.ChooesImage;
                  const ext = path.extname(req.file.originalname);
                  const exts = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
                  if (!exts.includes(ext)) throw lanquage.user.WrongFormatImage;
                  const maxSize = 2 * 1024 * 1024;
                  if (req.file.size > maxSize) throw lanquage.user.HighFileSize;
                  return true;
            }),
      ];
}
module.exports = {
      imageValidator,
};
