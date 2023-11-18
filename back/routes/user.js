const userRouter = require("express").Router();
// const { register, login, logout } = require("../controller/users");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { compare } = require("../utils/bcrypt");

// user register - POST METHOD
userRouter.post("/user/register", async (req, res) => {
  const errors = {};
  const { username, password, confirmPassword, pic } = req.body;
  try {
    //* yup user validation
    await User.userValidation(req.body);
    //* check user in db
    const alreadyUser = await User.findOne({ username });
    console.log(alreadyUser, "alreadyUser");
    if (alreadyUser) {
      errors.username = "chose an other user name";
      return res.status(400).json(errors);
    }
    const user = await User.create({
      username,
      password,
      confirmPassword,
      pic,
    });
    console.log("register is success", user);
    return res
      .status(201)
      .json({ message: " register is success", data: user });
  } catch (err) {
    console.log(err);
    err?.inner?.forEach((e) => {
      errors[e.path] = e.message;
    });
    return res.status(400).json(errors);
  }
});

// login user - POST METHOD
userRouter.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const passIsOkey = await compare(password, user.password);
    console.log(passIsOkey, "compare");
    if (passIsOkey) {
      const token = await jwt.sign(
        {
          id: user._id,
          username: user.username,
          pic: user?.pic,
        },
        process.env.JWT_SECRET,
        {}
      );
      console.log("token", token);
      return res
        .status(200)
        .cookie("token", token, {
          secure: "false",
          sameSite: "none",
        })
        .json({
          id: user._id,
          username,
          pic: user?.pic,
        });
    } else {
      throw "err";
    }
  } catch (err) {
    console.log("user login", err);
    return res
      .status(400)
      .json({ message: "enter right user and password", err: err });
  }
});
// logout user - POST METHOD
userRouter.post("/user/logout", async (req, res) => {
  try {
    return res.cookie("token", " ").status(200).json("logout");
  } catch (err) {
    console.log("logout err", err);
  }
});
module.exports = userRouter;
