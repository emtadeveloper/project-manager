const {authRoutes} = require("./auth");
const {userRoutes} = require("./user");

const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = {
    AllRoutes: router,
};
