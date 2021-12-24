const table = 'PostLocation';
const DB = require("../DB/pool");
const tableName = 'PostLocation';

class PostLocation {
    constructor(postId,post_location) {
        this.post_id = postId;
        this.latitude = post_location.latitude;
        this.longitude = post_location.longitude;
    }
    static createPostLocation(newPostLocation, result) {

        DB('INSERT INTO PostLocation SET ?', newPostLocation, (err, res) => {
            if (err) {
                console.log("Error while inserting location");
                result(null, err);
            }
            else {
                console.log("Location inserted successfuly");
                result(null, res);
            }
        });
    }
}
module.exports = PostLocation;


