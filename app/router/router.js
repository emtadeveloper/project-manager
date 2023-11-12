const { authRoutes } = require("./route/auth");
const { projectRoutes } = require("./route/project");
const { teamRoutes } = require("./route/team");
const { userRoutes } = require("./route/user");

const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/project", projectRoutes);
router.use("/team", teamRoutes);
router.use("/user", userRoutes);

module.exports = {
  AllRoutes: router,
};
