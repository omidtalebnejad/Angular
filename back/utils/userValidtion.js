const yup = require("yup");

const userValidation = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required()
    .min(5, "your username most be 5  charcter"),
  password: yup
    .string()
    .trim()
    .required("pasword should 6 charcter-number and a-Z charcter")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "pasword should 6 charcter-number and a-Z charcter"
    )
    .min(6),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref("password"), null], "passwords is not match")
    .trim()
    .min(6, "password is not match"),
  pic: yup.string(),
});

module.exports = userValidation;
