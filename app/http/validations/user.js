const {body} = require("express-validator");
const path = require("path");
const { lanquage } = require("../../locales/fa");
function imageValidator() {
    return [
        body("image").custom((value, {req}) => {
            if (!Boolean(req.file)) throw lanquage.image.EmptyImage;
            const ext = path.extname(req.file.originalname);
            const exts = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
            if (!exts.includes(ext)) throw  lanquage.image.WrongFormatImage;
            const maxSize = 2 * 1024 * 1024;
            if (req.file.size > maxSize) throw lanquage.image.ImageSizeImage;
            return true;
        }),
    ];
}
module.exports = {
    imageValidator,
};
