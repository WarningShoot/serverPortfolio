const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	securityLevel: String,
});

module.exports = mongoose.model("UserModel", userSchema);
