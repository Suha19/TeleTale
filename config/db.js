const mongoose = require("mongoose");
const config = require("config")
const db = config.get("mongoURL")
const conectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("Mongo DB conencted...");
    } catch (err) {
        console.log(err.message);
    }
}
module.exports = conectDB;