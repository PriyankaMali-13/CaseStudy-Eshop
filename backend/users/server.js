const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const port = 3000;

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "User API",
			version: "1.0.0",
			description: "A simple Express User API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);


const app = express();
app.use("/api-users", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
//Creates an instance of a single Route for the given path
const api = require("./routes/api");

app.use(bodyParser.json());

app.use("/api", api);

app.listen(port, function () {
	console.log("User server running on localhost:" + port);
});
