//Load express
const express = require("express");
const app = express(); // creating the instance of express
const cors = require("cors");


//Load body-parser(It is a middleware to receive data from req(req could be in form of html Forms,etc))
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

//Load Mongoose
const mongoose = require("mongoose");
require("./Product");
const Product = mongoose.model("Product");

//connect to db
mongoose.connect(
	"mongodb+srv://user:user123@eshop.mub0s.mongodb.net/ProductDb?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Connected to ProductDb");
		}
	}
);

app.get("/", (req, res) => {
	res.send("Product Service up and running");
});

//create product
/* app.post("/product", (req, res) => {
	var newProduct = {
		name: req.body.name,
		url: req.body.url,
		price: req.body.price,
	};
	// created new product with the attribute mentioned above
	var product = new Product(newProduct);
	//save product
	product
		.save()
		.then(() => {
			console.log("New Product created");
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
	res.send("A new product is created");
});
 */

//list all product
app.get("/products", (req, res) => {
	Product.find()
		.then((products) => {
			res.json(products);
		})
		.catch((err) => {
			throw err;
		});
});

//list product by id
app.get("/products/:id", (req, res) => {
	Product.findById(req.params.id)
		.then((product) => {
			// show product
			if (product) {
				res.json(product);
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

//delete product
app.delete("/product/:id", (req, res) => {
	Product.findOneAndRemove(req.params.id)
		.then(() => {
			res.send("Product removed");
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

app.listen(4000, () => {
	console.log("Product server running on localhost:4000");
});
