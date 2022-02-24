let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');

describe('Account controller', function () {

    describe('Post /account/signup', function () {
        console.log("helloo");
           let newUser ={
               email: 'testgmail.com',
               name: 'test@g',
               password: "333",
               photo: "ddd",
               google: false,
               country: 'dddd',
           }
           it('it should retrun 200 ok', (done) => {
                chai.request(server)
                    .post(`/account/signup`)
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
    });




    describe('Post /account/signup', function () {
        console.log("helloo");
           let newUser ={
               email: 'testgmail.com',
               name: 'test@g',
               password: "333",
               photo: "ddd",
               google: false,
               country: 'dddd',
           }
           it('it should retrun 409', (done) => {
                chai.request(server)
                    .post(`/account/signup`)
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(409);
                        done();
                    });
            });
    });




    describe('Post /account/signup', function () {
        console.log("helloo");
           let newUser ={
               email: 'test2gmail.com',
               name: 'test@g',
               password: "",
               photo: "ddd",
               google: false,
               country: 'dddd',
           }
           it('it should retrun 400', (done) => {
                chai.request(server)
                    .post(`/account/signup`)
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
    });




    //sign up for google 
    describe('Post /account/signup', function () {
        console.log("helloo");
           let newUser ={
               email: 'testinggmail.com',
               name: 'test@g',
               password: null,
               photo: "ddd",
               google: true,
               country: null,
           }
           it('it should retrun 200 ok', (done) => {
                chai.request(server)
                    .post(`/account/signup`)
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
    });




    // login for google
    describe('post /account/login', function () {
        let newUser = {
            email: 'testgmail.com',
            password: null,
            google:true
        }
        it('it should retrun 200 ok', (done) => {
            chai.request(server)
                .post(`/account/login`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

   
   

    describe('post /account/login', function () {
        let newUser = {
            email: 'testgmail.com',
            password: "333",
            google:false
        }
        it('it should retrun 200 ok', (done) => {
            chai.request(server)
                .post(`/account/login`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });


    describe('post /account/login', function () {
        let newUser = {
            email: 'testgmail.com',
            password: "3333",
            google:false
        }
        it('it should retrun 401', (done) => {
            chai.request(server)
                .post(`/account/login`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe('post /account/login', function () {
        let newUser = {
            email: 'test@gmail.com',
            password: "333",
            google:false
        }
        it('it should retrun 404', (done) => {
            chai.request(server)
                .post(`/account/login`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    
    //get user profile
    describe('get /account/userProfile', function () {
        let newUser = {
            email: jwt.sign({ email: "testgmail.com" }, process.env.TOKEN_KEY, {}),            
        }
        it('it should retrun 200', (done) => {
            chai.request(server)
                .get(`/account/userProfile`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('get /account/userProfile', function () {
        let newUser = {
            email: jwt.sign({ email: "test58gmail.com" }, process.env.TOKEN_KEY, {}),            
        }
        it('it should retrun user not found 404', (done) => {
            chai.request(server)
                .get(`/account/userProfile`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });


    //get user account for google signed up account
    describe('get /account/userProfile', function () {
        let newUser = {
            email: jwt.sign({ email: "testinggmail.com" }, process.env.TOKEN_KEY, {}),            
        }
        it('it should retrun 200', (done) => {
            chai.request(server)
                .get(`/account/userProfile`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });



   // edit country
    describe('Put /account/updateCountry', function () {
        let newUser = {
            email: jwt.sign({ email: "testgmail.com" }, process.env.TOKEN_KEY, {}),
            country:"egypt"
            
        }
        
        it('it should retrun edit 200', (done) => {
            chai.request(server)
                .put(`/account/updateCountry`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });


    describe('Put /account/updateCountry', function () {
        let newUser = {
            email: jwt.sign({ email: "test35gmail.com" }, process.env.TOKEN_KEY, {}),
            country:"egypt"
            
        }
        
        it('it should retrun edit 404', (done) => {
            chai.request(server)
                .put(`/account/updateCountry`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });




     // edit country for google account
    describe('Put /account/updateCountry', function () {
        let newUser = {
            email: jwt.sign({ email: "testinggmail.com" }, process.env.TOKEN_KEY, {}),
            country:"egypt"
            
        }
        
        it('it should retrun edit 200', (done) => {
            chai.request(server)
                .put(`/account/updateCountry`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });


    // edit country
    describe('Put /account/updateBio', function () {
        let newUser = {
            email: jwt.sign({ email: "testgmail.com" }, process.env.TOKEN_KEY, {}),
            bio:"I love travelling"
            
        }
        
        it('it should retrun edit 200', (done) => {
            chai.request(server)
                .put(`/account/updateBio`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });



    describe('Put /account/updateBio', function () {
        let newUser = {
            email: jwt.sign({ email: "test56gmail.com" }, process.env.TOKEN_KEY, {}),
            bio:"I love travelling"
            
        }
        
        it('it should retrun edit 404', (done) => {
            chai.request(server)
                .put(`/account/updateBio`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });



    // edit bio for google account
    describe('Put /account/updateBio', function () {
        let newUser = {
            email: jwt.sign({ email: "testinggmail.com" }, process.env.TOKEN_KEY, {}),
            bio:"I love travelling"
            
        }
        
        it('it should retrun edit 200', (done) => {
            chai.request(server)
                .put(`/account/updateBio`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });




});