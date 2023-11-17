const {authRoutes} = require("./auth");
const {userRoutes} = require("./user");
const {projectRoutes} = require("./project");
const {teamRoutes} = require("./team");

const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/project", projectRoutes);
router.use("/team", teamRoutes);

module.exports = {
    AllRoutes: router,
};
