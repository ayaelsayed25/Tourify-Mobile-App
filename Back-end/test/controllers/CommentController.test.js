let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require("jsonwebtoken");
const DB = require("../../DB/pool");

describe('Comment controller', function () {

    describe('POST /comments/createComment', function () {
        this.timeout(20000);
        let testPost = {
            post_id: 95852,
            body: "test"
        };
        const body = {
            email: process.env.TEST_TOKEN,
            post_id: 95852,
            body: "testtttt"
        };
        it('it should retrun Ok response', (done) => {

            let query = `insert ignore into Post(post_id, email ,body) values(${testPost.post_id},'${process.env.TEST_EMAIL}','${testPost.body}');`
            DB(query).then(() => {
                console.log(query);
                chai.request(server)
                    .post(`/comments/createComment`)
                    .set('authorization', process.env.TEST_TOKEN)
                    .send(body)
                    .end((err, res) => {
                        console.log(err);
                        console.log(res);
                        res.should.have.status(200);
                        done();
                    });
                
            }).catch(e => {
                console.log(e)
            })
        
        
        })
    
    }); 

    describe('Delete /comments/deleteComment', function () {
        this.timeout(30000);
        let testPost ={
            comment_id: 333,
            post_id:85,
            email: process.env.TEST_EMAIL ,
            body : "test"
        } 
        console.log(testPost.email)
        console.log("aloooooooooooooooooooooo")
        it('it should delete comment and decrement number of comments', (done) => {
    
            let query = `insert ignore into Post(post_id,email, body) values(${testPost.post_id},'${process.env.TEST_EMAIL }','${testPost.body}');`
            console.log(query)
            DB(query).then(() => {
                //done()
                console.log("inside  t")
                let query2 = `insert ignore into Comments(comment_id, post_id, email, body) values(${testPost.comment_id},${testPost.post_id},'${process.env.TEST_EMAIL}','${testPost.body}');`
                console.log(query2)
                DB(query2).then(()=>{
    
                        chai.request(server)
                            .delete(`/comments/deleteComment?id=${testPost.comment_id}`)
                            .set('authorization', process.env.TEST_TOKEN)
                            .send({ email: process.env.TEST_TOKEN })
                            .end((err, res) => {
                                console.log(err)
                                res.should.have.status(200);
                                let query3 = `SELECT * FROM tourify.Comments where comment_id=${testPost.comment_id};`
                                console.log(query)
                                DB(query3).then((comment)=>{
                                    comment.length.should.be.equal(0)
                                    done();
                                })
                            });
                    })          
            }).catch(e=>{
                console.log(e)
            })
    
        
        })
        console.log("ddd")
    
    
    });

    describe('Post /comments/editComment', function () {
        this.timeout(30000);
        let testPost ={
            post_id:33333,
            email: process.env.TEST_EMAIL ,
            body : "test",
            comment_id: 33333
        };
        const body = {
            email: process.env.TEST_EMAIL ,
            comment_id: 33333,
            body: "updatedddddddd"
        };
        it('it should edit comment', (done) => {
    
            let query = `insert ignore into Post(post_id,email, body) values(${testPost.post_id},'${process.env.TEST_EMAIL }','${testPost.body}');`
            console.log(query)
            DB(query).then(() => {
                //done()
                console.log("inside  t")
                let query2 = `insert ignore into Comments(comment_id, post_id, email, body) values(${testPost.comment_id},${testPost.post_id},'${process.env.TEST_EMAIL}','${testPost.body}');`
                console.log(query2)
                DB(query2).then(()=>{
    
                        chai.request(server)
                            .post(`/comments/editComment`)
                            .set('authorization', process.env.TEST_TOKEN)
                            .send(body)
                            .end((err, res) => {
                                res.should.have.status(200);
                                let query3 = `SELECT * FROM tourify.Comments where comment_id=${testPost.comment_id};`
                                console.log(query3)
                                DB(query3).then((comment)=>{
                                    comment[0].body.should.be.equal('updatedddddddd')
                                    done();
                                })
                            });
                    })          
            }).catch(e=>{
                console.log(e)
            })
    
        
        })
        console.log("ddd")
    
    
    });


});