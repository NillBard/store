const Router = require("express");
const authRouter = require("./authRouter");
const deviceRouter = require("./deviceRouter");

const router = new Router();

router.use("/users", authRouter);
router.use("/device", deviceRouter);

module.exports = router;
