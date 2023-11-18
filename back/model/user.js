const mongoose = require("mongoose");
const { hash } = require("../utils/bcrypt");
const userValidation = require("../utils/userValidtion");

const userShecma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default: "https://i.postimg.cc/PfvxsgPB/woman-2.png",
  },
});

// validation user
userShecma.statics.userValidation = (body) => {
  return userValidation.validate(body, { abortEarly: false });
};

// hash password & confirmPassword

userShecma.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  // hash passwords
  const { hPassword, hConfirmPassword } = await hash(
    this.password,
    this.confirmPassword
  );
  console.log(hPassword, hConfirmPassword, "hash paswords");
  this.password = hPassword;
  this.confirmPassword = hConfirmPassword;
});

const User = mongoose.model("user", userShecma);

module.exports = User;
