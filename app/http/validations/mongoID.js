const {param} = require("express-validator");
const {lanquage} = require("../../locales/fa");

function mongoIDValidator() {
    return [param("id").isMongoId().withMessage(lanquage.middlewares.wrongId)];
}
module.exports = {
    mongoIDValidator,
};
