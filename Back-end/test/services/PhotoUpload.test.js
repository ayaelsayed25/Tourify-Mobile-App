let chai = require('chai');
const { uploadPhotosToAzure } = require('../../Services/PhotoUpload')
var expect = chai.expect;



describe('Account controller', function () {

        describe('wordSearch', function() {
            let photos =[]
            
            it('takes an input and returns a changed input to the screen', function() {
               
            var output = uploadPhotosToAzure(photos); 
            
            expect(output).to.be.an('array');
            expect(output).to.have.members([]);
            });
        });




        describe('wordSearch', function() {
            let photos =[
                {type:"image",
                base64 :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAEUCAMAAABeT1dZAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCnAcZgAAG7E7IiAAAAAElFTkSuQmCC" , 
                 name:"photo1"}
            ]

            it('takes an input and returns a changed input to the screen', function() {
            var output = uploadPhotosToAzure(photos);
            console.log(output); 
            expect(output).to.be.an('array');
            expect(output).to.have.members([`https://tourifyphotos.blob.core.windows.net/images/${photos[0].name}`]);
            });
        });



        describe('wordSearch', function() {
            let photos =[
                {type:"image",
                base64 :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAEUCAMAAABeT1dZAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCnAcZgAAG7E7IiAAAAAElFTkSuQmCC" , 
                 name:"photo1"},

                 {type:"image",
                 base64 :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAEUCAMAAABeT1dZAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCnAcZgAAG7E7IiAAAAAElFTkSuQmCC" , 
                  name:"photo2"}
            ]
            it('takes an input and returns a changed input to the screen', function() {
            var output = uploadPhotosToAzure(photos); 
            expect(output).to.be.an('array');
            expect(output).to.have.members([`https://tourifyphotos.blob.core.windows.net/images/${photos[0].name}`,
            [`https://tourifyphotos.blob.core.windows.net/images/${photos[1].name}`]]);
            });
        });



        describe('wordSearch', function() {
            let photos =[
                {type:"image",
                base64 :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAEUCAMAAABeT1dZAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCnAcZgAAG7E7IiAAAAAElFTkSuQmCC" , 
                 name:"photo1"},

                 {type:"image",
                 base64 :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAEUCAMAAABeT1dZAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCnAcZgAAG7E7IiAAAAAElFTkSuQmCC" , 
                  name:"photo2"},

                 {type:"image", 
                  base64 :  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAEUCAMAAABeT1dZAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCnAcZgAAG7E7IiAAAAAElFTkSuQmCC" , 
                  name:"photo3"}
            ]
            it('takes an input and returns a changed input to the screen', function() {
            var output = uploadPhotosToAzure(photos); 
            expect(output).to.be.an('array');
            expect(output).to.have.members([`https://tourifyphotos.blob.core.windows.net/images/${photos[0].name}`,
            `https://tourifyphotos.blob.core.windows.net/images/${photos[1].name}` ,
            `https://tourifyphotos.blob.core.windows.net/images/${photos[2].name}`]);
            });
        });



        

});