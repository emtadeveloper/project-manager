const {TeamController} = require("../http/controllers/team.controller");
const {checkLogin} = require("../http/middlewares/autoLogin");
const {expressValidatorMapper} = require("../http/middlewares/checkErrors");
const {mongoIDValidator} = require("../http/validations/mongoID");
const {createTeamValidator} = require("../http/validations/team");

const router = require("express").Router();

router.post("/create", checkLogin, createTeamValidator(), expressValidatorMapper, TeamController.createTeam);

router.get("/list", checkLogin, TeamController.getAllTeam);

//  هنگام تعریف روت ها آید دار ها در پایین ترین حالت باشه

router.get("/me", checkLogin, TeamController.getMyTeams);

router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.getTeamById);

router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.removeTeamById);

router.put("/update/:teamID", checkLogin, TeamController.updateTeam);

router.get("/invite/:teamID/:username", checkLogin, TeamController.inviteUserToTeam)

module.exports = {
    teamRoutes: router,
};
