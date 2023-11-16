const {ProjectController} = require("../http/controllers/project.controller");
const {checkLogin} = require("../http/middlewares/autoLogin");
const {expressValidatorMapper} = require("../http/middlewares/checkErrors");
const {createProjectValidator} = require("../http/validations/project");
const {addStrToArr} = require("../http/middlewares/convertStringToArray");
const {upload_multer} = require("../modules/multer");
const router = require("express").Router();

router.post("/create", upload_multer.single("image"), checkLogin, addStrToArr("tags"), createProjectValidator(), expressValidatorMapper, ProjectController.createProject);

router.get("/list", checkLogin, ProjectController.getAllProject);

module.exports = {
    projectRoutes: router,
};
