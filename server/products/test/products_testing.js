const expect = require("chai").expect;
const request = require("supertest");
const assert = require("chai").assert;
const should = require("chai").should();


const app = "http://localhost:4000/";
let id = "";

//testcase to get all the products in array format
describe("To get all products", () => {
	it("shouldd get array of all products", (done) => {
		request(app)
			.get("/products")
			.then(() => {
				expect(Array);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

//testcase to create a new product and see it has the specified properties or not
describe("Create a new product /POST", (done) => {
	it("new product should have name url price properties", () => {
		request(app)
			.post("/product")
			.then(() => {
				expect(res.body).to.have.property("name");
				expect(res.body).to.have.property("url");
				expect(res.body).to.have.property("price");
				res.should.have.status(200);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it("Checking for null", function () {
		const product = null;
		//product.should.not.exist; (Cannot read property 'should' of null)
		should.not.exist(product);
	});
});

//delete the product by given id
describe("/DELETE/:id Product", () => {
	it("created product deletion", (done) => {
		request(app)
			.delete("/product/" + this.id)
			.then((value) => {
				expect(value.statusCode).to.be.equal(404);
				done();
			})
			.catch((err) => {
				console.log(err);
				done(err);
				throw err;
			});
	});
});
