//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let Book = require('../app/models/book');

//Require the dev-dependencies
var express = require('express');
// var app = express();
var app = require('../index');;
let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../server');
let should = chai.should();
var request = require('supertest'); // route testing
var assert = chai.assert;

// chai.use(chaiHttp);
//Our parent block
// describe('Books', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         Book.remove({}, (err) => {
//            done();
//         });
//     });
/*
  * Test the /GET route
  */

  // describe('GET /', function() {
  //   it('respond with html', function() {
  //     return request(app)
  //       .get('/')
  //       .set('Accept', 'application/json')
  //       .expect(200)
  //       // .then(response => {
  //       //     console.log(response);
  //       //     assert(response.body.name, 'tobi')
  //       // })
  //   });
  // });


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
