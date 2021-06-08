const expect = require("chai").expect;
const request = require("supertest");
const assert = require("chai").assert;
const should = require("chai").should();

const app = "http://localhost:7000/";

//testcase to get all the orders in array format
describe("To get all orders", () => {
	it("should get array of all orders", (done) => {
		request(app)
			.get("/orders")
			.then(() => {
				expect(Array);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

//testcase to create a new order and see it has the specified properties or not
describe("Create a new order /POST", (done) => {
	it("new order should have name price total quantity properties", () => {
		request(app)
			.post("/product")
			.then(() => {
				expect(res.body).to.have.property("_id");
				expect(res.body).to.have.property("name");
				expect(res.body).to.have.property("total");
				expect(res.body).to.have.property("price");
				expect(res.body).to.have.property("quantity");
				res.should.have.status(200);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it("Checking for null", function () {
		const order = null;
		//order.should.not.exist; (Cannot read property 'should' of null)
		should.not.exist(order);
	});
});
