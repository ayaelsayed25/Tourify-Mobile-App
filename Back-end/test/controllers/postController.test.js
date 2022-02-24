let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();
chai.use(chaiHttp);
const jwt = require("jsonwebtoken");
const DB = require("../../DB/pool");

describe('Posts controller', function () {

        describe('POST /posts/feed', function () {
            const tests = [
                {limit:10 , offset :0 },
                { limit: 10, offset :70 },
                { limit: 30, offset :20 },
                { limit: 50, offset :0 },
                { limit: 100, offset :70 },

            ];

            tests.forEach(t=>{
                it('it should retrun an array of the at most the specified size', (done) => {
                    chai.request(server)
                        .post(`/posts/feed?limit=${t.limit}&offset=${t.offset}`)
                        .set('authorization', process.env.TEST_TOKEN)
                        .send({ email: process.env.TEST_TOKEN })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.at.most(t.limit);

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
        describe('GET /posts/profilePosts', function () {
            const tests = [
                { limit: 10, offset: 0 },
                { limit: 10, offset: 70 },
                { limit: 30, offset: 20 },
                { limit: 50, offset: 0 },
                { limit: 100, offset: 70 },

            ];

            tests.forEach(t => {
                it('it should retrun an array of the at most the specified size with the test user email', (done) => {
                    chai.request(server)
                        .get(`/posts/profilePosts?limit=${t.limit}&offset=${t.offset}`)
                        .set('authorization', process.env.TEST_TOKEN)
                        .send({ email: process.env.TEST_TOKEN })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.at.most(t.limit);

                            let posts = res.body;
                            posts.forEach(p => {
                                p.should.have.property('userName');
                                p.should.have.property('body');
                                p.should.have.property('userPhoto');
                                p.should.have.property('photos');
                                p.should.have.property('email');
                                p.email.should.be.equal(process.env.TEST_EMAIL)

                            })

                            done();
                        });
                });

            })
        })

        describe('Delete /posts/delete', function () {
            this.timeout(20000);
            let testPost ={
                post_id:999999999,
                email: process.env.TEST_EMAIL ,
                body : "test t t t t t t t"
            } 

            it('it should delete post with its componennts', (done) => {

                let query = `insert  ignore into  Post(post_id,email, body) values(${testPost.post_id},'${process.env.TEST_EMAIL }','${testPost.body}');`
                DB(query).then(() => {
                    //done()
                    let testPhoto = {
                        photo: "htttp://test.com"
                    } 
                    console.log("inside  t")
                    let query2 = `insert  ignore into  PostPhoto(post_id ,photo) values('${999999999}','${testPhoto.photo}');`
                    DB(query2).then(()=>{

                            chai.request(server)
                                .delete(`/posts/delete?id=${999999999}`)
                                .set('authorization', process.env.TEST_TOKEN)
                                .send({ email: process.env.TEST_TOKEN })
                                .end((err, res) => {
                                    console.log(err)
                                    res.should.have.status(200);
                                    let query3 = `SELECT * FROM tourify.PostPhoto where post_id=${999999999};`
                            

                                    DB(query3).then((photos)=>{
                                        photos.length.should.be.equal(0)
                                        let query4 = `SELECT * FROM tourify.Post where post_id=${999999999};`
                                        DB(query4).then((posts) => {
                                            posts.length.should.be.equal(0)
                                            done();
                                        })
                                   
                                    })
                                });
                        })          
                }).catch(e=>{
                    console.log(e)
                })

            
            })
            console.log("ddd")


        });
        
        describe('Delete /posts/delete', function () {
            this.timeout(20000);
            let testPost = {
                post_id: 999999999,
                email: process.env.TEST_EMAIL,
                body: "test t t t t t t t"
            }

            it('it should not  delete Post of another user (return 401)', (done) => {

                let query = `insert  ignore into  Post(post_id,email, body) values(${testPost.post_id},'${process.env.TEST_EMAIL}','${testPost.body}');`
                DB(query).then(() => {
    
                        chai.request(server)
                            .delete(`/posts/delete?id=${999999998}`)
                            .set('authorization', process.env.TEST_TOKEN)
                            .send({ email: process.env.TEST_TOKEN })
                            .end((err, res) => {
                                console.log(err)
                                res.should.have.status(401);
                                done();
                            });
                    

                }).catch(e => {
                    console.log(e)
                })


            })


        });


        describe('GET /posts/feedCount', function () {
   
            it('it should retrun an array of the specified size', (done) => {
                chai.request(server)
                    .get(`/posts/feedCount`)
                    .send({ email: process.env.TEST_TOKEN})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.count.should.be.a('number');
                        done();
                    });
            });

        });

        describe('POST /posts/TripCreation', function () {
            this.timeout(20000);
            it('it should retrun Ok response', (done) => {
                let body = {
                    email: process.env.TEST_TOKEN,
                    body: 'Hello',
                    tags: [],
                    photos: [],
                    organisation: 'Trip Travel',
                    rate: 5,
                    budget: '2000',
                    currency: 'USD',
                    duration: '5',
                    latitude: 32.5,
                    longitude: 51
                };
                chai.request(server)
                    .post(`/posts/TripCreation`)
                    .send(body)
                    .end((err, res) => {
                        console.log(res);
                        res.should.have.status(200);
                        done();
                    });
            });

        });  
        
        
        describe('POST /posts/Edit', function () {
            it('it should retrun Ok response', (done) => {
                let query1 = `INSERT INTO Post
                (post_id,email, body, duration, organisation, rate, budget, currency, number_of_comments, number_of_likes)  VALUES
                (85857,"${process.env.TEST_EMAIL}","postDescriotion",7,"Travel institution",3, 2000,'$', 0, 0 ) ;`;

                let test = {
                    photo: "photo3",
                    tag: "tag1",
                    latitude: 30.5,
                    longitude: 50.5,
                }
                let body = {
                    postId: 85857,
                    email: process.env.TEST_TOKEN,
                    body: "Hello",
                    tags: ["tag3","tag2"],
                    photos: [{"photo":"photo1"},{"photo": "photo2"}],
                    organisation: "Trip Travel",
                    deletedPhotos: [{"photo":"photo3"}],
                    deletedTags: ["tag1"],
                    rate: 5,
                    budget: 2000,
                    currency: "$",
                    duration: 5,
                    latitude: 32.5,
                    longitude: 51
                };
                let query2 = `INSERT INTO PostPhoto(post_id,photo) VALUES (85857,"${test.photo}");`
                let query3 = `INSERT INTO PostTags(post_id,tag_name) VALUES (85857,"${test.tag}");`
                let query4 = `INSERT INTO PostLocation(post_id,latitude,longitude) VALUES (85857,${test.latitude},${test.longitude});`

                DB(query1).then(() => {
                    DB(query2).then(()=>{
                        DB(query3).then(()=>{
                            DB(query4).then(()=>{
                                chai.request(server)
                                    .post(`/posts/Edit`)
                                    .set('authorization', process.env.TEST_TOKEN)
                                    .send(body)
                                    .end((err, res) => {
                                        res.should.have.status(200);
                                        console.log(res);
                                        done();
                                    });
                            }) 
                        }) 
                    })          
                }).catch(e=>{
                        console.log(e)
                })
            });

        });   


      
    describe('GET /posts/:id/:token', function () {
        this.timeout(20000);
        
        it('it shoud return a specific post its id and user token are passed through parameters', (done) => {
            let query1 = `INSERT INTO Post
            (post_id,email, body, duration, organisation, rate, budget, currency, number_of_comments, number_of_likes)  VALUES
            (99,"${process.env.TEST_EMAIL}","postDescriotion",7,"Travel institution",3, 2000,'$', 0, 0 ) ;`;

            let test = {
                photo: "http/photo.jpg",
                tag: "tag",
                latitude: 30.5,
                longitude: 50.5,
            }
            let query2 = `INSERT INTO PostPhoto(post_id,photo) VALUES (99,"${test.photo}");`
            let query3 = `INSERT INTO PostTags(post_id,tag_name) VALUES (99,"${test.tag}");`
            let query4 = `INSERT INTO PostLocation(post_id,latitude,longitude) VALUES (99,${test.latitude},${test.longitude});`

            DB(query1).then(() => {
                DB(query2).then(()=>{
                    DB(query3).then(()=>{
                        DB(query4).then(()=>{
                            chai.request(server)
                                .get(`/posts/99/${process.env.TEST_TOKEN}`)
                                .set('authorization', process.env.TEST_TOKEN)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    let post = res.body[0];
                                    post.body.should.be.equal('postDescriotion');
                                    post.duration.should.be.equal(7);
                                    post.organisation.should.be.equal('Travel institution');
                                    post.rate.should.be.equal(3);
                                    post.budget.should.be.equal(2000);
                                    post.currency.should.be.equal('$');
                                    post.latitude.should.be.equal(test.latitude);
                                    post.longitude.should.be.equal(test.longitude);
                                    done();
                                });
                        }) 
                    }) 
                })          
            }).catch(e=>{
                    console.log(e)
            })
            
        })
        console.log("Doneee")    
    });
            
    describe('GET /posts/viewPost', function () {
    
        it('it should post and its comments', (done) => {
            chai.request(server)
                .get(`/posts/viewPost?id=${1000000000}`)
                .set('authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log(res.body.post);
                    console.log(res.body.comments);
                    console.log(res.body.likes);


                    let post = res.body.post ; 
                        post[0].should.have.property('body');
                        post[0].should.have.property('duration');
                        post[0].should.have.property('organisation');
                        post[0].should.have.property('rate');
                        post[0].should.have.property('budget');
                        post[0].should.have.property('currency');
                        post[0].should.have.property('latitude');
                        post[0].should.have.property('longitude');
                        post[0].should.have.property('photos');
                        post[0].should.have.property('tags');
                        post[0].should.have.property('number_of_likes');
                        post[0].should.have.property('number_of_comments');

                        let comments = res.body.comments ; 
                        comments.forEach (c => {
                        c[0].should.have.property('email');
                        c[0].should.have.property('body');
                        c[0].should.have.property('created_at');
                        c[0].should.have.property('updated_at');
                        })

                        let likes = res.body.likes ; 
                        likes.forEach (l => {
                        l[0].should.have.property('email');
                        })
                        done();
                });
        });

    });

});   