const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const dbConnect = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PWA}@cluster0.nok5zel.mongodb.net/omidBlog`
    );
    console.log(`data base is connecting ${dbConnect.connection.host}`);
  } catch (err) {
    console.log(err, "db connect is fail");
    process.exit(1);
  }
};

module.exports = dbConnect;
