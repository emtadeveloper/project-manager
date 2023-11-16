const autoBind = require("auto-bind");
const {ProjectModel} = require("../../models/project");
const {lanquage} = require("../../locales/fa");

class ProjectController {
    constructor() {
        autoBind(this);
    }
    async createProject(req, res, next) {
        try {
            const {title, text, tags} = req.body;
            const image = req.file?.path?.substring(7);
            const owner = req.user._id;
            const result = await ProjectModel.create({title, text, owner, tags, image});
            if (!result) throw {status: 400, message: lanquage.project.FailedAdd};
            return res.status(201).json({status: 201, success: true, message: lanquage.project.SuccessAdd});
        } catch (error) {
            next(error);
        }
    }
}
module.exports = {
    ProjectController: new ProjectController(),
};
