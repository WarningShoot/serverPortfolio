const express = require("express");
const todoModel = require("../models/TodoModel");

const router = express.Router();

router.get("/:id", async (req, res) => {
	const todoItems = await todoModel.find({ userId: req.params.id });

	return res.status(202).json(todoItems);
});

router.put("/:id", async (req, res) => {
	const todoItem = {
		userId: req.params.id,
		text: req.body.text,
		completed: req.body.completed,
	};

	const instance = new todoModel(todoItem);
	instance.save();

	return res.status(202).send("dziala");
});

router.delete("/:id", (req, res) => {
	todoModel.findByIdAndDelete(req.params.id, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log();
		}
	});

	return res.status(202).send("usunieto");
});

router.patch("/:id", (req, res) => {
	todoModel.findByIdAndUpdate(
		req.params.id,
		{ $set: { completed: true } },
		[],
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);

	return res.status(202).send("dziala");
});

module.exports = router;
