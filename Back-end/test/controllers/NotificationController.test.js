// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../../server');
// let should = chai.should();
// chai.use(chaiHttp);
// const jwt = require("jsonwebtoken");
// const DB = require("../../DB/pool");

// describe('Notification controller', function () {
//     describe('GET /notifications/', function () {
//         let query = `insert into Post(email, body, duration, organisation, rate, budget, currency, number_of_comments, number_of_likes)
//                     values(testuser@gmail.com, 'hi', 5, 'ho', 3, 55, 'ae', 0, 0)`
//         DB(query)
//         query = `insert into Notification(id, post_id, sender_email, receiver_email, comment_id, viewed)
//                          values (5, 6, 'testgmail.com', 'testuser@gmail.com', null, false);`
//         DB(query)
//         it('it should retrun an array of notifications', (done) => {
//             chai.request(server)
//                 .get(`/notifications/`)
//                 .set('authorization', process.env.TEST_TOKEN)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('array');

//                     let notifications = res.body ; 
//                     notifications.forEach (n => {
//                         n.should.have.property('id');
//                         n.should.have.property('photo');
//                         n.should.have.property('name');
//                         n.should.have.property('post_id');
//                         n.should.have.property('comment_id');
//                         n.should.have.property('sender_email');
//                         n.should.have.property('created_at');
//                         n.should.have.property('viewed');
//                     })
//                     done();
//                 });
//         });
//     });
    
//     describe('PUT /notifications/view', function () {

//         it('it should retrun true', (done) => {
//             chai.request(server)
//                 .put(`/notifications/view/5`)
//                 .end((err, res) => {

//                     res.should.have.status(200);
//                     query = `delete from Notification where id = 5`
//                     DB(query)
//                     done();
//                 });
//         });
//     });   
// });   
