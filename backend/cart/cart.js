const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Load Mongoose
const mongoose = require("mongoose");
require("./cartSchema");
const Cart = mongoose.model("Cart");

//connect to db
mongoose.connect(
	"mongodb+srv://user:user123@eshop.mub0s.mongodb.net/CartDb?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Connected to CartDb");
		}
	}
);

//add to cart
app.post("/add/cart", (req, res) => {
	var newCart = {
		ProductId: mongoose.Types.ObjectId(req.body.ProductId),
	};
	var cart = new Cart(newCart);
	//save product to cart
	cart.save()
		.then(() => {
			console.log("New product added to cart ");
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
	res.send("product added to cart");
});

//list all product
app.get("/cart", async (req, res) => {
	var cart = await Cart.find();
	// console.log(cart.);
	// cart = JSON.parse(cart);
	const response = [];
	for (let i in cart) {
		let p = cart[i];
		var product = await axios.get(
			"http://localhost:4000/product/" + p.ProductId
		);
		cart[i].product = product.data;
		//console.log(product.data);
		response.push({ ...product.data });
	}
	res.json(response);
});

//list product of cart - fetch data from product microservice
app.get("/cart/:id", (req, res) => {
	Cart.findById(req.params.id).then((cart) => {
		if (cart) {
			//make req to product service to get data (using axios)
			axios
				.get("http://localhost:4000/product/" + cart.ProductId)
				.then((response) => {
					var cartData = {
						productName: response.data.name,
						productUrl: response.data.url,
						productPrice: response.data.price,
					};
					res.json(cartData);
					console.log(cartData);
				});
		} else {
			res.send("Invalid Product ");
		}
	});
});

//delete product inside the cart
app.delete("/cart/:id", (req, res) => {
	Cart.findOneAndRemove(req.params.id)
		.then(() => {
			res.send("Product removed from cart");
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

app.listen(5000, () => {
	console.log("Cart server running on localhost:5000");
});
