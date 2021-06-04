var expect  = require('chai').expect;
var request = require('request');
var server = require('../server')

it('Main page content', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        expect(body).to.equal("User API running");
        done();
    });
});