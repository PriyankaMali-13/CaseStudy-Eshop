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

//creating schema for swagger api

/**
 * @swagger
 * components:
 *   schemas:
 *      userSchema:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         email:
 *           type: string
 *           description: The user unique email id
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         id: 1254gfg645
 *         email: y@y.com
 *         password: yyy
 */

//function to verify token
function verifyToken(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(401).send("Unauthorized request");
	}
	//splits into array so that the barer string stored into 0th indexd and actual token into 1st index
	let token = req.headers.authorization.split(" ")[1];
	if (token === "null") {
		return res.status(401).send("Unauthorized request");
	}
	//verify the token and returens the decoded token
	let payload = jwt.verify(token, "secretKey");
	if (!payload) {
		return res.status(401).send("Unauthorized request");
	}

	req.userId = payload.subject;
	//passon the execution to next event handler
	next();
}
//checking api
router.get("/", (req, res) => {
	res.send("User API running ");
});

//swagger code to create new user(register)

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSchema'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userSchema'
 *       500:
 *         description: Some server error
 */

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

			//creating payload which is an object contain registered user id
			let payload = { subject: registeredUser._id };
			let token = jwt.sign(payload, "secretKey");
			res.status(200).send({ token });
		}
	});
});

//swagger code to login user

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSchema'
 *     responses:
 *       200:
 *         description: The user was successfully loggedin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userSchema'
 *       500:
 *         description: Some server error
 */

//api for login user
router.post("/login", (req, res) => {
	//let userData = req.body; //extract user data from body
	//check user exits in the db or not

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400);
		//bcypt is used to hash password and genetarte salt ang hashed password
		bcrypt.compare(password, user.password, (err, data) => {
			if (err) throw err;
			if (data) {
				//creating payload with key subject and value as userid
				let payload = { subject: user._id };
				//generating token using sign method
				let token = jwt.sign(payload, "secretKey");
				res.status(200).send({ token });
			} else {
				return res.status(401).json({ msg: "Invalid credencials" });
			}
		});
	});
});

//swagger code to get all the users

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/userSchema'
 */

//get list of all users
router.get("/users", (req, res) => {
	User.find()
		.then((users) => {
			res.json(users);
			res.status(201);
		})
		.catch((err) => {
			throw err;
		});
});

//swagger code to get user by id

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userSchema'
 *       404:
 *         description: The user was not found
 */

//get user by id
router.get("/user/:id", (req, res) => {
	//req.params property is an object containing properties mapped to the named route “parameters”
	User.findById(req.params.id)
		.then((user) => {
			if (user) {
				res.json(user);
			} else {
				res.sendStatus(404);
			}
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

//swagger code to delete user by id

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
//delete user
router.delete("/user/:id", (req, res) => {
	User.findOneAndDelete(req.params.id)
		.then(() => {
			res.send("User removed");
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});
module.exports = router;

/*let payload = { subject: user._id };
				let token = jwt.sign(payload, "secretKey");
				res.status(200).send({ token });*/
