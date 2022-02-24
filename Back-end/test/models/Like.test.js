const { post } = require('superagent');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const Like = require('../../Models/Like');
const jwt = require("jsonwebtoken");
const DB = require("../../DB/pool");


describe('Likes Model', function () {

    describe('like', function () {
        let testPost = {
            post_id: 333333333,
            email: process.env.TEST_EMAIL,
            body: "test"
        }
        let query = `insert  ignore into  Post(post_id,email, body) values(${testPost.post_id},'${process.env.TEST_EMAIL}','${testPost.body}');`
        DB(query).then(() => {
            it('it should retrun OK like added', (done) => {
                Like.create(process.env.TEST_EMAIL, 333333333, (err) => {
                    should.equal(null);
                    obj.count.should.be.a('number');
                    done();

                })
            });
        }).catch(e => {
            console.log(e)
        })
    });

    describe('increment likes', function () {
        it('it should retrun ', (done) => {
            Like.create(process.env.TEST_EMAIL, 333333333, (err) => {
                should.equal(null);
                console.log(obj)
                obj.should.be.a(1);
                done();

            })
        });

    });

});