const mongoose = require("mongoose");
//const { isEmail } = require("email-validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		//validate: [isEmail, "Please enter a valid email"],
	},
	password: {
		type: String,
		required: true,
		//minlength: [6, "Minimum length of password is 6 characters"],
	},
});
//hash the password before saving the data(thats y i have used pre method)
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
module.exports = mongoose.model("user", userSchema, "users");
//call this module user
// schema name is userSchema
//users == collection name
