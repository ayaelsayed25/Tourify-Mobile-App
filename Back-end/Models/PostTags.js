const table = 'PostTags';
const DB = require("../DB/pool");
const tableName = 'PostTags';

class PostTags {
    constructor(postId,tagId) {
        this.post_id = postId;
        this.tag_id = tagId;
    }
    static createPostTags(newPostTags, result) {

        DB('INSERT INTO PostTags SET ?', newPostTags, (err, res) => {
            if (err) {
                console.log("Error while inserting in PostTags");
                result(null, err);
            }
            else {
                console.log("PostTags inserted successfuly");
                result(null, res);
            }
        });
    }
}

module.exports = PostTags;

