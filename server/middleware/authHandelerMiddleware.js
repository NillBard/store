const jwt = require("jsonwebtoken");
const { db } = require("../db");

module.exports = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.json({ status: 401, message: "Not Auth" });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await db.user.findUnique({ where: { id: decode.id } });
    next();
  } catch (error) {
    throw new Error(error);
  }
};
