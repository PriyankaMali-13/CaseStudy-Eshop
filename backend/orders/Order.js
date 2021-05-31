const mongoose = require("mongoose");
const product = require("../products/Product");

mongoose.model("Order", {
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	firstName: {
		type: String,
		require: true,
	},
	lastName: {
		type: String,
		require: true,
	},
	address: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
	},
	quantity: {
		type: Number,
		default: 1,
	},
	paymentMethod: {
		type: String,
		default: "COD",
	},
});
