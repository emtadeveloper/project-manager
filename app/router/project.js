const {ProjectController} = require("../http/controllers/project.controller");
const {checkLogin} = require("../http/middlewares/autoLogin");
const {expressValidatorMapper} = require("../http/middlewares/checkErrors");
const {createProjectValidator} = require("../http/validations/project");
const {addStrToArr} = require("../http/middlewares/convertStringToArray");
const {upload_multer} = require("../modules/multer");
const {mongoIDValidator} = require("../http/validations/mongoID");
const {imageValidator} = require("../http/validations/image");
const router = require("express").Router();

router.post("/create", upload_multer.single("image"), checkLogin, addStrToArr("tags"), createProjectValidator(), expressValidatorMapper, ProjectController.createProject);

router.get("/list", checkLogin, ProjectController.getAllProject);

router.get("/list-project-user", checkLogin, ProjectController.getAllProjectOfUser);

router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.getProjectById);

router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject);

router.put("/edit/:id", checkLogin, addStrToArr("tags"), mongoIDValidator(), expressValidatorMapper, ProjectController.updateProject);

router.patch("/edit-projectImage/:id", upload_multer.single("image"), checkLogin, imageValidator(), mongoIDValidator(), expressValidatorMapper, ProjectController.updateProjectImage);

module.exports = {
    projectRoutes: router,
};
