let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require("jsonwebtoken");
const DB = require("../../DB/pool");


describe('Posts controller', function () {

    describe('GET /posts/feed', function () {
        const tests = [
            {limit:10 , offset :0 },
            { limit: 10, offset :70 },
            { limit: 30, offset :20 },
            { limit: 50, offset :0 },
            { limit: 100, offset :70 },

        ];

        let body ={ email: process.env.TEST_TOKEN ,
                     budget:"",
                     rate :null,
                     duration:"",
                     currency:"",
                     organization :"" ,
                     tags : ["beach","romantic"] 
        }

        tests.forEach(t=>{
            it('it should retrun an array of the filtered attribute', (done) => {
                chai.request(server)
                    .post(`/posts/feed?limit=${t.limit}&offset=${t.offset}`)
                    .set('authorization', process.env.TEST_TOKEN)
                    .send(body)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                       

                        let posts = res.body ; 
                        posts.forEach (p=>{
                            p.should.have.property('userName');
                            p.should.have.property('body');
                            p.should.have.property('userPhoto');
                            p.should.have.property('photos');
                            p.should.have.property('email');

                        })

                        done();
                    });
            });

        })
    })




    describe('GET /posts/feed', function () {
        const tests = [
            {limit:10 , offset :0 },
            { limit: 10, offset :70 },
            { limit: 30, offset :20 },
            { limit: 50, offset :0 },
            { limit: 100, offset :70 },

        ];

        let body ={ email: process.env.TEST_TOKEN ,
                     budget:"",
                     rate :5,
                     duration:"2",
                     currency:"",
                     organization :"" ,
                     tags : ["beach"] 
        }

        tests.forEach(t=>{
            it('it should retrun an array of the at most the specified size', (done) => {
                chai.request(server)
                    .post(`/posts/feed?limit=${t.limit}&offset=${t.offset}`)
                    .set('authorization', process.env.TEST_TOKEN)
                    .send(body)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                       

                        let posts = res.body ; 
                        posts.forEach (p=>{
                            p.should.have.property('userName');
                            p.should.have.property('body');
                            p.should.have.property('userPhoto');
                            p.should.have.property('photos');
                            p.should.have.property('email');

                        })

                        done();
                    });
            });

        })
    })



});   