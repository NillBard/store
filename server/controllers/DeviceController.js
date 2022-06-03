const { db } = require("../db");
const jwt = require("jsonwebtoken");

module.exports = {
  DeviceController: class {
    async getAll(_, res) {
      const deviceList = await db.deviceList.findMany();

      deviceList
        ? res.json({ status: 200, data: deviceList })
        : res.json({ status: 400, message: "List is empty" });
    }
    async getOne(req, res) {
      const { id } = req.params;

      const currentDevice = await db.deviceList.findUnique({
        where: { id: id },
      });

      currentDevice
        ? res.json({ status: 200, data: currentDevice })
        : res.json({ status: 404, message: "Not Found" });
    }

    async addCart(req, res) {
      const userId = req.user.id;
      const { id } = req.params;
      const name = req.user.name;

      const currentDeviceList = await db.deviceList.findUnique({
        where: { id: id },
      });

      if (!currentDeviceList) {
        res.json({ status: 404, message: "Not Found" });
      }

      console.log(userId);
      console.log(id);

      const currentUser = await db.user.update({
        where: { id: userId },
        data: {
          cart: {
            create: [
              {
                device: {
                  connect: {
                    id: id,
                  },
                },
                assignedBy: name,
                assignedAt: new Date(),
              },
            ],
          },
        },
      });
      console.log();

      res.json({ status: 200, data: "Device added" });
    }

    async incCart(req, res) {
      const userId = req.user.id;
      const { id } = req.params;

      const device = await db.deviceList.updateMany({
        where: {
          AND: [{ id: id }, { user: { every: { user: { id: userId } } } }],
        },
        data: {
          countInCart: { increment: 1 },
        },
      });

      // if (!device) res.send("Not found");

      console.log(device);

      res.send(device);
      //res.json({ status: 200, data: device });

      // const count = device.count;

      // const incCountDevice = await db.deviceList.update;
    }

    async addNewDevice(req, res) {
      const { name, description, img, price } = req.body;

      if ((!name && !description && !img, !price)) {
        res.json({ status: 404, message: "Not Found" });
      }

      const candidate = await db.device.findUnique({ where: { name: name } });
      let newDevice;

      if (candidate) {
        newDevice = await db.deviceLisy.create({
          data: {
            deviceListName: name,
          },
        });
      } else {
        newDevice = await db.deviceList.create({
          data: {
            description,
            img,
            price,
            name,
          },
        });
      }

      console.log(newDevice);
      res.json({ status: 200, data: newDevice });
    }
  },
};
