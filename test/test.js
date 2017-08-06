//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var express = require('express');
var app = require('../index');;
let chai = require('chai');
let should = chai.should();
var request = require('supertest');
var assert = chai.assert;

// Test landing page
describe('GET /', function() {
  it('respond with html', function(done) {
    request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      console.log(res.text);
      res.text.should.include("Hot tweets");
      done();
    })
  });
});

// Test API /hot
describe('GET /hot?twitterID=nytimes', function() {
  it('respond with array of id', function(done) {
    var id = "nytimes";
    request(app)
    .get('/hot?twitterID='+id)
    .expect(200)
    .end((err, res) => {
      console.log(res.body);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(10);
      done();
    })
  });
});

// Test API /hot2
describe('GET /hot2?twitterID=nytimes', function() {
  it('respond with array of id', function(done) {
    var id = "nytimes";
    request(app)
    .get('/hot2?twitterID='+id)
    .expect(200)
    .end((err, res) => {
      console.log(res.body);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(10);
      done();
    })
  });
});
