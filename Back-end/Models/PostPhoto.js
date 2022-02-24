const table = 'PostPhoto';
const DB = require("../DB/pool");
const tableName = 'PostPhoto';

module.exports = {

    tableName: tableName,

    createPostPhoto: async  (post_id, photos) => {
        
        try {
            await photos.forEach(ph = (photo) => {
                console.log(photo.name)
                const imgUrl = `https://tourifyphotos.blob.core.windows.net/images/${photo.name}`;
                let insertQuery = `INSERT INTO ${tableName}  VALUES  (${post_id},"${imgUrl}" ) ;`;
                console.log(insertQuery)
                DB(insertQuery)
                });
                return
        }
        catch (e) {
             return e
        }
    },

    deletePostPhoto: async  (post_id, photos) => {
        try {
            await photos.forEach(ph = (photo) => {
                let deleteQuery = `DELETE FROM ${tableName}  WHERE post_id = ${post_id} AND photo = "${photo.photo}" ;`;
                console.log({deleteQuery})
                DB(deleteQuery)
            });
            return
        }
        catch (e) {
            return e
        }
     }
}


