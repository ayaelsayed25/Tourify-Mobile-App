require('dotenv').config();
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require("jsonwebtoken");
const DB = require("../DB/pool");

before( function (done) {
    console.log("dd")
    this.timeout(2000000);
    let query = `insert  ignore into  user(email, name, password) values('testuser@gmail.com', 'testuser', '$2b$12$DeUOYwsPrHEikbInuJ8LheMIUkj6Wz.qosH8Y9W7w1HeHy0Byfp8W');`
    DB(query).then(()=>{
    let body = {
        email: 'testuser@gmail.com',
        password: 'salah',
    }

    chai.request(server)
        .post(`/account/login`)
        .send(body)
        .end((err, res) => {
            if(err)
                done(err)
          console.log("token: ",res.body.token)
          process.env.TEST_TOKEN = res.body.token
            process.env.TEST_EMAIL ='testuser@gmail.com'
          done();
        });

    }).catch(e => {
        console.log(e)
    })

    


    // Increase the Mocha timeout 


})

// After all tests have finished...
after(function (done) {

    this.timeout(300000);
      done()
    // Remove records created in the DB during the tests 

  
})