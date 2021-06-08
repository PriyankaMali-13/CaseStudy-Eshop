const mongoose = require("mongoose");
const User = mongoose.User;

const expect = require("chai").expect;
const should = require("chai").should();
const assert = require("chai").assert;
const request = require("supertest");
const app = "http://localhost:3000/";

//testcase to get all the users in array format
describe("Get all users /GET", () => {
	it("should get array of all users", (done) => {
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
describe("Register new user /POST", (done) => {
	it("request a token when user register", () => {
		request(app)
			.post("/register")
			.then(() => {
				expect(res.body).to.have.property("token");
				expect(res.body).to.have.property("email");
				expect(res.body).to.have.property("password");
				res.should.have.status(200);
				token = res.body.token;
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	it("should have property name email", function () {
		const user = {
			email: "a@a.com",
			password:
				"$2a$08$FZTpEP17vhgYvv5PpmiElu28UZKoXE8jsxjQZfjKDzDEkU4yLdQ76",
		};
		user.should.have.property("email").equal("a@a.com");
	});
	it("Checking for null", function () {
		const user = null;
		//user.should.not.exist; (Cannot read property 'should' of null)
		should.not.exist(user);
	});
});

//testcase for loggedin user to check token and specified properties like email and password
describe("Login user /POST", (done) => {
	it("request a token when user logs in ", () => {
		request(app)
			.post("/login")
			.then(() => {
				expect(res.body).to.have.property("token");
				expect(res.body).to.have.property("email");
				expect(res.body).to.have.property("password");
				res.should.have.status(200);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
	it("should have property name email", function () {
		const user = {
			email: "a@a.com",
			password:
				"$2a$08$FZTpEP17vhgYvv5PpmiElu28UZKoXE8jsxjQZfjKDzDEkU4yLdQ76",
		};
		user.should.have.property("email").equal("a@a.com");
	});
	it("Checking for null", function () {
		const user = null;
		//user.should.not.exist; (Cannot read property 'should' of null)
		should.not.exist(user);
	});
});

//when password is null it should give 404
describe("when the username and password is missing/mismatch", () => {
	it("missing password should give 401 status code", (done) => {
		request(app)
			.post("/login")
			.send({
				email: "s@s.com",
				password: "",
			})
			.then((res) => {
				res.should.have.status(404);
				done();
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	});
});

//testcase to get all the users by id
describe("Get user by id /GET/:id", () => {
	it("it should GET a user by the given id", (done) => {
		const user = {
			email: "a@a.com",
			password:
				"$2a$08$FZTpEP17vhgYvv5PpmiElu28UZKoXE8jsxjQZfjKDzDEkU4yLdQ76",
		};
		request(app)
			.get("/user" + user.id)
			.send(user)
			.then((res) => {
				expect(res.body).to.have.property("token");
				expect(res.body).to.have.property("email");
				expect(res.body).to.have.property("password");
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("_id").eql(user.id);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

//delete user by id
describe("/DELETE/:id user", () => {
	it("it should DELETE a user given the id", (done) => {
		let user = new User({
			email: "a@a.com",
			password:
				"$2a$08$FZTpEP17vhgYvv5PpmiElu28UZKoXE8jsxjQZfjKDzDEkU4yLdQ76",
		});
		user.save((err, user) => {
			request(app)
				.delete("/user/" + user.id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have
						.property("email")
						.eql("User successfully deleted!");

					done();
				});
		});
	});
});
