const mongoose = require("mongoose");
async function connectDatabse() {
  try {
    await mongoose.connect(
      `mongodb://127.0.0.1:${process.env.PORT_MONGO}/${process.env.DATABASE_NAME}`
    );
    console.log("connect database success");
  } catch (eror) {
    console.log("connect database fail", error);
  }
}
module.exports = connectDatabse;
