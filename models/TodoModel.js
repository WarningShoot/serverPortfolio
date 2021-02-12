const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	userId: String,
	text: String,
	completed: Boolean,
});

module.exports = mongoose.model("TodoModel", todoSchema);
