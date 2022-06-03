const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");
const { db } = require("../db");

module.exports = {
  AuthController: class {
    _generateAccessToken(payload) {
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
    }

    _generateRefreshToken(payload) {
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30d" });
    }

    async registration(req, res) {
      const { email, password } = req.body;

      const candidate = await db.user.findUnique({ where: { email: email } });

      if (candidate) {
        throw new Error("Already exist");
      }

      const hashPassword = await bycrpt.hash(password, 8);

      const user = await db.user.create({
        data: {
          ...req.body,
          password: hashPassword,
        },
      });

      const refreshToken = this._generateRefreshToken({ id: user.id });
      const accessToken = this._generateAccessToken({
        id: user.id,
        email: user.email,
        password: user.password,
      });

      console.log(accessToken);

      res.cookie("token_cookie", refreshToken, {
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        maxAge: 86400 * 30,
      });

      res.json({ status: 200, data: accessToken });
    }

    async login(req, res) {
      const { email, password } = req.body;

      const candidate = await db.user.findUnique({ where: { email: email } });

      if (!candidate) {
        throw new Error("This user doesn't exist");
      }

      const isPasswordValid = await bycrpt.compare(
        password,
        candidate.password
      );

      if (!isPasswordValid) {
        throw new Error("Password isn't compare");
      }

      const refreshToken = this._generateRefreshToken({ id: user.id });
      const accessToken = this._generateAccessToken({
        id: candidate.id,
        email: candidate.email,
      });

      res.cookie("token_cookie", refreshToken, {
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        maxAge: 86400,
      });
      res.json({ status: 200, data: accessToken });
    }

    async auth(req, res) {
      const cookieToken = req.cookies?.token_cookie;

      if (!cookieToken)
        return res.json({ status: 404, message: "Cookies is empty" });

      const decode = jwt.verify(cookieToken, process.env.SECRET_KEY);
      console.log(decode);
      const user = await db.user.findUnique({ where: { id: decode.id } });
      console.log("user", user);

      if (!user) {
        res.json({ status: 404, message: "Error" });
      }

      const token = this._generateAccessToken({
        email: user.email,
        id: user.id,
        password: user.password,
      });
      const refreshToken = this._generateRefreshToken({ id: user.id });

      res.cookie("token_cookie", refreshToken, {
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        maxAge: 3600 * 24 * 30,
      });
      res.json({ status: 200, data: token });
    }
  },
};
