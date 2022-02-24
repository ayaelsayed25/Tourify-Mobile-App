const bcrypt = require('bcrypt');
const Account = require('../Models/Account.js');
const coolImages = require("cool-images");

module.exports = {
    deploy: () => {
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
        const names = ['Elle Mysie',
            'Shakira Caileigh',
            'Julie Benjamin',
            'Oralee Avonlea',
            'Regena Frances', 'Augustine Calvin',
            'Gloria Murtada',
            'Viona Wenona',
            'Kizzy Letitia',
            'Sebastian Latif']
        const countries = ['Kuwait',
            'Djibouti',
            'Kazakhstan',
            'France',
            'Guinea-Bissau',
            'Turkey',
            'Egypt',
            'Botswana',
            'Iraq',
            'Estonia']
        const password = 'Password0!'
        for (let i = 0; i < 10; i++) {
            bcrypt.hash(password, 12, (err, passwordHash) => {
                console.log('ALO')

                if (passwordHash) {
                    console.log('haah')
                    const photo = coolImages.one()


                    //create user account
                    return Account.create({
                        email: emails[i],
                        name: names[i],
                        password: `"${passwordHash}"`,
                        photo: photo,
                        googleBool: false,
                        country: `"${countries[i]}"`

                    }, (err) => {
                        if (err)
                            console.log("error while creating the user");
                        else {
                            console.log("user created");

                        }

                    })

                };
            });
        }
    }

}