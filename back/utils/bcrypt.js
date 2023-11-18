const bcrypt = require("bcryptjs");

const hash = async (password, confirmPassword) => {
  console.log(password, confirmPassword, "paswrods is hjasing password");
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(password, salt);
    const hConfirmPassword = await bcrypt.hash(confirmPassword, salt);
    console.log(hPassword, hConfirmPassword, "hash paswords");
    return {
      hPassword,
      hConfirmPassword
    };
  }
};
const compare = async (reqPassword, dbPasswrod) => {
  return await bcrypt.compare(reqPassword, dbPasswrod);
};
module.exports = {
  hash,
  compare
};
