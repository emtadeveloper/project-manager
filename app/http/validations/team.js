const {body} = require("express-validator");
const {TeamModel} = require("../../models/team");
const {lanquage} = require("../../locales/fa");

function createTeamValidator() {
    return [
        body("name").isLength({min: 5}).withMessage(lanquage.team.WrongName),
        body("description").notEmpty().withMessage(lanquage.team.EmptyDescription),
        body("username").custom(async username => {
            const usernameRegep = /^[a-z]+[a-z0-9\_\.]{3,}$/gim;
            if (usernameRegep.test(username)) {
                const team = await TeamModel.findOne({username});
                if (team) throw lanquage.team.DuplicateUserName;
                return true;
            }
            throw lanquage.team.WrongUserName;
        }),
    ];
}

module.exports = {
    createTeamValidator,
};
