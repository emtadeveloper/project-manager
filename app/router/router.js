const {authRoutes} = require("./auth");
const {userRoutes} = require("./user");
const {projectRoutes} = require("./project");

const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/project", projectRoutes);

module.exports = {
    AllRoutes: router,
};
