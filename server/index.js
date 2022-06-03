require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routers/index");
const { seed } = require("./prisma/seed");
cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

const app = express()
  .use(cors({ credentials: true, origin: [process.env.LOCALHOST] }))
  .use(cookieParser(process.env.SECRET_KEY))
  .use(express.json())
  .use("/api", router);
(async () => await seed())();

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
  } catch (e) {}
};

start();
