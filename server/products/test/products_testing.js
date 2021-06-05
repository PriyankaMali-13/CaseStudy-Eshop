const expect = require("chai").expect;
const request = require("supertest");
const assert = require("chai").assert;

const app = "http://localhost:4000/";


describe("To get all products", () => {
	
	it('ok',(done)=>{
		request(app)
		.get('/products').then(()=>{
			expect(Array)
			done();
		})
		.catch((err)=>{
			done(err)
		})
	})

	
});
