const {ProjectController} = require("../http/controllers/project.controller");
const {checkLogin} = require("../http/middlewares/autoLogin");
const {expressValidatorMapper} = require("../http/middlewares/checkErrors");
const {createProjectValidator} = require("../http/validations/project");
const {addStrToArr} = require("../http/middlewares/convertStringToArray");
const {upload_multer} = require("../modules/multer");
const {mongoIDValidator} = require("../http/validations/mongoID");
const router = require("express").Router();

router.post("/create", upload_multer.single("image"), checkLogin, addStrToArr("tags"), createProjectValidator(), expressValidatorMapper, ProjectController.createProject);

router.get("/list", checkLogin, ProjectController.getAllProject);

router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.getProjectById);

router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject);

module.exports = {
    projectRoutes: router,
};
