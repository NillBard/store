const Router = require("express");
const authHandelerMiddleware = require("../middleware/authHandelerMiddleware");
const { DeviceController } = require("../controllers/DeviceController");

const deviceController = new DeviceController();
const router = new Router();

router.get(
  "/",

  deviceController.getAll.bind(deviceController)
);
router.get(
  "/:id",

  deviceController.getOne.bind(deviceController)
);
router.post(
  "/:id",
  authHandelerMiddleware,
  deviceController.addCart.bind(deviceController)
);

router.put(
  "/:id",
  authHandelerMiddleware,
  deviceController.incCart.bind(deviceController)
);

router.post("/", deviceController.addNewDevice.bind(deviceController));

module.exports = router;
