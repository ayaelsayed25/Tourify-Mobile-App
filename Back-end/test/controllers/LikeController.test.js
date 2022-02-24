let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require("jsonwebtoken");
const DB = require("../../DB/pool");

describe('Likes controller', function () {

    describe('POST /likes/like', function () {
        this.timeout(20000);
        let testPost = {
            post_id: 555544,
            body: "test"
        };
        const body = {
            email: process.env.TEST_TOKEN,
            post_id: 555544
        };
        it('it should retrun Ok response', (done) => {

            let query = `insert  ignore into  Post(post_id,email, body) values(${testPost.post_id},'${process.env.TEST_EMAIL}','${testPost.body}');`
            DB(query).then(() => {
                console.log(query);
                chai.request(server)
                    .post(`/likes/like`)
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

    describe('Delete /likes/dislike', function () {
        this.timeout(20000);
        let testPost ={
            post_id:9998888,
            email: process.env.TEST_EMAIL ,
            body : "test"
        } 
    
        it('it should delete likes and decrement number of likes', (done) => {
    
            let query = `insert  ignore into  Post(post_id,email, body) values(${testPost.post_id},'${process.env.TEST_EMAIL }','${testPost.body}');`
            console.log(query)
            DB(query).then(() => {
                console.log("inside  t")
                let query2 = `insert  ignore into  Likes(post_id ,email) values(${testPost.post_id},'${process.env.TEST_EMAIL}');`
                console.log(query2)
                DB(query2).then(()=>{
    
                        chai.request(server)
                            .delete(`/likes/dislike?id=${testPost.post_id}`)
                            .set('authorization', process.env.TEST_TOKEN)
                            .send({ email: process.env.TEST_TOKEN })
                            .end((err, res) => {
                                console.log(err)
                                res.should.have.status(200);
                                let query3 = `SELECT * FROM tourify.Likes where post_id=${testPost.post_id} AND email = '${process.env.TEST_EMAIL}';`
                                console.log(query)
                                DB(query3).then((likes)=>{
                                    likes.length.should.be.equal(0)
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




