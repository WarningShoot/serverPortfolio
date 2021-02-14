const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/UserModel");

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const check = await userModel.find({
			$or: [{ username: req.body.username }, { email: req.body.email }],
		});

		if (check.length !== 0) {
			return res.status(400).send("username or email is already used!");
		}

		const user = {
			username: req.body.username,
			password: hashedPassword,
			email: req.body.email,
			securityLevel: "user",
		};

		const instance = new userModel(user);
		instance.save();

		const returnUser = {
			id: instance._id,
			username: instance.username,
			email: instance.email,
			securityLevel: instance.securityLevel,
		};

		res.status(201).json(returnUser);
	} catch {
		res.status(400).send();
	}
});

router.post("/login", async (req, res) => {
	const user = await userModel.findOne({ username: req.body.username }).exec();

	if (user == null) {
		return res.status(404).send("Cannot find user");
	}

	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const returnUser = {
				id: user._id,
				username: user.username,
				email: user.email,
				securityLevel: user.securityLevel,
			};
			res.status(200).json(returnUser);
		} else {
			res.status(404).json(null);
		}
	} catch {
		res.status(500).send();
	}
});

module.exports = router;
