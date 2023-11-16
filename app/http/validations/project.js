const {body} = require("express-validator");
const {lanquage} = require("../../locales/fa");
const path = require("path");

function createProjectValidator() {
    return [
        body("title").notEmpty().withMessage(lanquage.project.Emptytitle),
        body("tags").custom(tags => {
            if (!tags || tags.length == 0 || tags.length > 10) throw lanquage.project.tagValidate;
            return true;
        }),
        body("text").notEmpty().isLength({min: 20}).withMessage(lanquage.project.textValidate),
        body("image").custom((value, {req}) => {
            if (!Boolean(req.file)) throw lanquage.image.EmptyImage;
            const ext = path.extname(req.file.originalname);
            const exts = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
            if (!exts.includes(ext)) throw lanquage.image.WrongFormatImage;
            const maxSize = 2 * 1024 * 1024;
            if (req.file.size > maxSize) throw lanquage.image.ImageSizeImage;
            return true;
        }),
    ];
}
module.exports = {
    createProjectValidator,
};
