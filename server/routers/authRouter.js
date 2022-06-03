const Router = require("express");
const { AuthController } = require("../controllers/AuthController");
const authMiddleware = require("../middleware/authHandelerMiddleware");

const router = new Router();
const authController = new AuthController();

router.post("/login", authController.login.bind(authController));
router.post("/registration", authController.registration.bind(authController));
router.get("/auth", authController.auth.bind(authController));

module.exports = router;
