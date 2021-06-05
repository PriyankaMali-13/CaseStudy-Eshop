const expect = require("chai").expect;
const should = require("chai").should();
const assert = require("chai").assert;
const request = require("supertest");

const app = "http://localhost:3000/";

//testcase to get all the users in array format
describe("Get all users /GET", () => {
	it("To get all users", (done) => {
		request(app)
			.get("/users")
			.then(() => {
				expect(Array);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

});


//testcase to register user with token and specified properties like email and password
describe("Register new user /POST",(done)=>{
	it("request a token when user register", () => {
		request(app)
			.post("/register")
			.then(() => {
				expect(res.body).to.have.property("token");
				expect(res.body).to.have.property("email");
				expect(res.body).to.have.property("password");

				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	it("should have property name email", function () {
		const user = { email: "a@a.com", password: "p" };
		user.should.have.property("email").equal("a@a.com");
	});
	it("Checking for null", function () {
		const user = null;
		//user.should.not.exist; (Cannot read property 'should' of null)
		should.not.exist(user);
	});
})
