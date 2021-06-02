const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const db =
	"mongodb+srv://user:user123@eshop.mub0s.mongodb.net/UserDb?retryWrites=true&w=majority";

mongoose.connect(
	db,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Connected to UserDb");
		}
	}
);

//function to verify token
function verifyToken(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(401).send("Unauthorized request");
	}
	let token = req.headers.authorization.split(" ")[1]; //splits into array so that the barer string stored into 0th indexand actual token into 1st index
	if (token === "null") {
		return res.status(401).send("Unauthorized request");
	}
	//to verify the token
	let payload = jwt.verify(token, "secretKey");
	if (!payload) {
		return res.status(401).send("Unauthorized request");
	}
	req.userId = payload.subject;
	next();
}
//checking api
router.get("/", (req, res) => {
	res.send("User API running ");
});
// api for register user
router.post("/register", (req, res) => {
	let userData = req.body;
	let user = new User(userData);
	user.save((err, registeredUser) => {
		if (err) {
			console.log(err);
		} else {
			/*1)after generating the user sccessfully 1st we need to generate payload
			the payload s obj which will contaain user id
		 2)now generate the token with a secretkey as u want in this case it is a string of "secretKey"
		 3)send this token as an object
		 4) do same for login api */
			let payload = { subject: registeredUser._id };
			let token = jwt.sign(payload, "secretKey");
			res.status(200).send({ token });
		}
	});
});

//api for login user
router.post("/login", (req, res) => {
	//let userData = req.body; //extract user data
	//check user exits in the db or not

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400);
		bcrypt.compare(password, user.password, (err, data) => {
			if (err) throw err;
			if (data) {
				let payload = { subject: user._id };
				let token = jwt.sign(payload, "secretKey");
				res.status(200).send({ token });
			} else {
				return res.status(401).json({ msg: "Invalid credencials" });
			}
		});
	});
});

//get list of all users
router.get("/users", (req, res) => {
	User.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			throw err;
		});
});

module.exports = router;

/*let payload = { subject: user._id };
				let token = jwt.sign(payload, "secretKey");
				res.status(200).send({ token });*/
