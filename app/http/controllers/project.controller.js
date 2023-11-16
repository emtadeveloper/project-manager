const autoBind = require("auto-bind");
const {ProjectModel} = require("../../models/project");
const {lanquage} = require("../../locales/fa");
const {createLinkForFiles} = require("../../modules/function");

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
    async getAllProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projects = await ProjectModel.find({owner});
            for (const project of projects) {
                project.image = createLinkForFiles(project.image, req);
            }
            return res.status(200).json({
                status: 200,
                success: true,
                projects,
            });
        } catch (error) {
            next(error);
        }
    }
    async findProject(projectID, owner) {
        const project = await ProjectModel.findOne({owner, _id: projectID});
        if (!project) throw {status: 404, message: lanquage.project.NotFoundProject};
        return project;
    }
    async getProjectById(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await this.findProject(projectID, owner);
            project.image = createLinkForFiles(project.image, req);
            return res.status(200).json({
                status: 200,
                success: true,
                project,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}
module.exports = {
    ProjectController: new ProjectController(),
};
