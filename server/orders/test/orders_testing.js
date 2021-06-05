const expect = require("chai").expect;
const request = require("supertest");
const assert = require("chai").assert;

const app = "http://localhost:7000/";

describe("To get all orders", () => {
	it("ok", (done) => {
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
