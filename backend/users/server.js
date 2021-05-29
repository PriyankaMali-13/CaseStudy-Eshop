const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;

const app = express();
app.use(cors());
//Creates an instance of a single Route for the given path
const api = require("./routes/api");

app.use(bodyParser.json());

app.use("/api", api);

app.listen(port, function () {
	console.log("User server running on localhost:" + port);
});
