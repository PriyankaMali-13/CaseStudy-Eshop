//Load express
const express = require("express");
const app = express(); // creating the instance of express
const cors = require("cors");
const product = require('../products/Product')

//Load body-parser(It is a middleware to receive data from req(req could be in form of html Forms,etc))
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

//Load Mongoose
const mongoose = require("mongoose");
require("./Order");
const Order = mongoose.model("Order");

//connect to db
mongoose.connect(
	"mongodb+srv://user:user123@eshop.mub0s.mongodb.net/OrderDb?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Connected to OrderDb");
		}
	}
);

app.get("/", (req, res) => {
	res.send("Order Service up and running");
});

//create order
/* app.post("/order", (req, res) => {
	var newOrder = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		address: req.body.address,
		product: mongoose.Types.ObjectId(req.body.ProductId),
	};
	// created new order with the attribute mentioned above
	var order= new Order(newOrder);
	//save order
	order
		.save()
		.then(() => {
			console.log("New Order was created");
		})
		.catch((err) => {
			if (err) {
				console.log(err);
			}
		});
	res.send("A new order is created");
}); */
app.post("/add/orders", (req, res) => {
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;
	let address = req.body.address;

	console.log(req.body.products);

	let carts;
	try {
		carts = req.body.products;
		if (!firstName.trim() || !lastName.trim() || !address.trim()) {
			res.status(400);
			res.json({
				error: {
					message: "firstName , lastName , address Required..",
				},
			});
			return;
		}
	} catch (error) {
		console.log(error)
		res.status(400);
		if (!carts) {
			res.json({
				error: {
					message: "Products Required..",
				},
			});
			return;
		}
		res.json({
			error: {
				message: "firstName , lastName , address Required..",
			},
		});
		return;
	}

	let orders = [];
	for (let i = 0; i < carts.length; i++) {
		orders.push(createOrder(req, carts[i], firstName, lastName, address));
	}

	Order.create(orders)
		.then((orders) => {
			return res.status(201).json({
				message: "Orders was created",
				orders,
				
			});
		})
		.catch((error) => {
			next(error);
		});
});

//list all order
app.get("/orders", (req, res) => {
	Order.find()
		.then((orders) => {
			res.json(orders);
		})
		.catch((err) => {
			throw err;
		});
});

//list order by id
app.get("/orders/:id", (req, res) => {
	Order.findById(req.params.id)
		.then((order) => {
			// show order
			if (order) {
				res.json(order);
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

//delete order
app.delete("/order/:id", (req, res) => {
	Order.findOneAndRemove(req.params.id)
		.then(() => {
			res.send("Order removed");
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

//function to create order 
function createOrder(req, productInfo, firstName, lastName, address) {
	return new Order({
		_id: mongoose.Types.ObjectId(),
		product: productInfo.productId,
		quantity: productInfo.quantity,
		price: productInfo.price,
		
		firstName,
		lastName,
		address,
	});
}

app.listen(7000, () => {
	console.log("Order server running on localhost:7000");
});
