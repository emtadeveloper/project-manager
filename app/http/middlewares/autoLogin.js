const {UserModel} = require("../../models/user");
const {verifyJwtToken} = require("../../modules/function");
const {lanquage} = require("../../locales/fa");
const checkLogin = async (req, res, next) => {
    try {
        let authError = {
            status: 401,
            message: lanquage.middlewares.wrongLogin,
        };
        const authorization = req?.headers?.authorization;
        if (!authorization) throw authError;
        let token = authorization.split(" ")?.[1];
        if (!token) throw authError;
        const result = await verifyJwtToken(token);
        const user = await UserModel.findOne({username: result.username}, {password: 0});
        if (!user) throw authError;
        req.user = user;
        return next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkLogin,
};
