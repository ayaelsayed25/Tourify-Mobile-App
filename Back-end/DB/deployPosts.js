const Post = require('../Models/Post')
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const { uploadPhotosToAzure } = require('../Services/PhotoUpload')
const coolImages = require("cool-images");
const DB = require("../DB/pool");


module.exports = {

    deploy: async () => {

        const emails = ['1@gmail.com',
            '2@gmail.com',
            '3@gmail.com',
            '4@gmail.com',
            '5@gmail.com',
            '6@gmail.com',
            '7@gmail.com',
            '8@gmail.com',
            '9@gmail.com',
            '10@gmail.com',
        ]
        const lorem = new LoremIpsum({
            sentencesPerParagraph: {
                max: 8,
                min: 4
            },
            wordsPerSentence: {
                max: 16,
                min: 4
            }
        });


        for (let i = 0; i < 10; i++) {
            var post_id;
            const len = Math.floor(Math.random() * 5 + 1);
            let photos = []
            for (let j = 0; j < len; j++) {
                photos.push(coolImages.one())
            }
            var post = {
                body: lorem.generateSentences(Math.floor(Math.random() * 8)),
                tags: ["Fun"],
                photos: photos,
                organisation: "hehe",
                rate: 5,
                duration: 15,
                budget: 3000,
                currency: 'USD',
                latitude: null,
                longitude: null,
            }
            await Post.createPost(emails[Math.floor(Math.random() * 10)], post, (err, post) => {
                post_id = post.insertId;
            })
                .then(() => {

                    try {
                        console.log('hahahaha')
                        photos.forEach(ph = (photo) => {
                            let insertQuery = `INSERT INTO PostPhoto  VALUES  (${post_id},"${photo}" ) ;`;
                            console.log(insertQuery)
                            DB(insertQuery)
                        });
                        return
                    }
                    catch (e) {
                        return e
                    }


                    //    PostLocation.createPostLocation(post_id, req.body)
                    //    PostTags.createPostTags(post_id, tags)
                    return
                })

                .catch((err) => {
                    console.log(err)
                });
        }


    },

}