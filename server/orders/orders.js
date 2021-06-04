//Load express
const express = require("express");
const app = express(); // creating the instance of express
const cors = require("cors");
const product = require('../products/Product')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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

//swagger api configuration
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Order API",
			version: "1.0.0",
			description: "A simple Express Order API",
		},
		servers: [
			{
				url: "http://localhost:7000",
			},
		],
	},
	apis: ["orders.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-orders", swaggerUI.serve, swaggerUI.setup(specs));

//Defining schema for swagger

/**
 * @swagger
 * components:
 *   schemas:
 *      Order:
 *       type: object
 *       required:
 *         - product
 *         - firstName
 *         - lastName
 *         - address
 *         - price
 *         - quantity
 *         - paymentMethod
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the users order
 *         product:
 *           type: string
 *           description: The product added to cart
 *         firstName:
 *           type: string
 *           description: The users first name
 *         lastName:
 *           type: string
 *           description: The users last name
 *         address:
 *           type: string
 *           description: The address of user
 *         quantity:
 *           type: number
 *           description: The quantity of product ordered
 *         price:
 *           type: number
 *           description: The product price
 *         paymentMethod:
 *           type: string
 *           description: Delivery type
 *
 *       example:
 *         id: 1254gfg645
 *         product: xyz
 *         firstName: Priyanka
 *         lastName: Mali
 *         address: High street
 *         quantity: avaliable at any quantity
 *         price: 700
 *         paymentMethod: COD
 *         
 */


app.get("/", (req, res) => {
	res.send("Order Service up and running");
});


//swagger code to place order

/**
 * @swagger
 * /add/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was successfully placed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 */

//create order
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


//swagger code to list all orders

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

//list all orders
app.get("/orders", (req, res) => {
	Order.find()
		.then((orders) => {
			res.json(orders);
		})
		.catch((err) => {
			throw err;
		});
});


//swagger code to list orders by id

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get the orders by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The orders id
 *     responses:
 *       200:
 *         description: The orders description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The Order was not found
 */

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


//swagger code to delete product by id
/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Remove the orders by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *
 *     responses:
 *       200:
 *         description: The order was deleted
 *       404:
 *         description: The order was not found
 */


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
