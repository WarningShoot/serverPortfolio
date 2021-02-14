const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes imports
const users = require("./routes/users");
const todo = require("./routes/todo");

const app = express();
mongoose.connect(process.env.DB_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

app.get("/", (req, res) => {
	return res.status(202).json({
		object: "dziala",
	});
});

app.use(express.json());
app.use(cors());

app.listen(8000);

// Routes
app.use("/users", users);
app.use("/todo", todo);
