const azure = require('azure-storage')

const STORAGE_ACCOUNT_NAME = 'tourifyphotos';
const ACCOUNT_ACCESS_KEY = 'Chu/mKn8zHr3jde72nk8/+GGfHOZM26npd80TeqtSeOJ8lekcJVk+boKLUKx/z9g6a1eDwMHQHq+NhveN86XWA==';

const blobSvc = azure.createBlobService(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY)

const containerName = 'images'


module.exports = {
    uploadPhotosToAzure: (photos) => {
        var Url=[];
        Promise.all(photos.map(async photo => {

            let name = photo.name;
            let imgType = photo.type;
            let imgBuffer = new Buffer.from(photo.base64, 'base64')

            blobSvc.createBlockBlobFromText(containerName, name, imgBuffer, {
                contentSettings: { contentType: imgType }
            }, (error, result, response) => {
                if (error)
                    reject(error);
                const imgUrl = `https://tourifyphotos.blob.core.windows.net/${containerName}/${name}`;
    
                // resolve(imgUrl)
                Url.push(imgUrl);
            })
        }));
        return Url;
    }
}