//Load express server
const express = require("express");
// creating the instance of express
const app = express();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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

//swagger api configuration
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Product API",
			version: "1.0.0",
			description: "A simple Express Product API",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["products.js"],
};

/*initializing swaggerJsDoc - this will find the location specified in options and will 
know where to parse the swaggerJsDoc*/
const specs = swaggerJsDoc(options);

/*Define the app by passing swaggerUi.serve as a callback then we specify the spec
that will build the UI */
app.use("/api-products", swaggerUI.serve, swaggerUI.setup(specs));

app.get("/", (req, res) => {
	res.send("Product Service up and running");
});

//Defining schema for swagger

/**
 * @swagger
 * components:
 *   schemas:
 *      Product:
 *       type: object
 *       required:
 *         - name
 *         - url
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         name:
 *           type: string
 *           description: The product name
 *         url:
 *           type: string
 *           description: The product url
 *         price:
 *           type: number
 *           description: The product price
 *
 *       example:
 *         id: 1254gfg645
 *         name: Mens Cloths
 *         url : "http://google.tripcloths"
 *         price: 700
 */

//swagger code to create product

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */

//create product
app.post("/product", (req, res) => {
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

//swagger code to list all products

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
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

//swagger code to list product by id

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */

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

//swagger code to delete product by id
/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */

//delete product by id
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
