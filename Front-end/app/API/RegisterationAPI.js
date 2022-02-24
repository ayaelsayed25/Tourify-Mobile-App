import IPAdress from '../API/IPAdress';

let API_URL = IPAdress + "account";
const signInRequest = async (email, password, bool) => {
    let payload = { email: email, password: password, bool: bool };
    let response = await fetch(API_URL + "/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).catch(error => {
        return { successful: false, message: "An error occurred, check your network" }
    });
    let data = await response.json();
    if (response.status === 200) {
        return { successful: true, userToken: data.token };
    }
    else {
        let message = "";
        if (response.status === 404)
            message = "Wrong Email";
        else if (response.status === 401)
            message = "Wrong Password";
        else
            message = "An error occurred, please try again";
        return { successful: false, message: message };
    }
}
const signUpRequest = async (email, name, password, country, photo, bool) => {
    let payload = { email: email, name: name, password: password, country: country, photo: photo, google: bool };
    let response = await fetch(API_URL + "/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).catch(error => {
        console.log("ERRRRRROR:" + error);
        return { successful: false, message: "An error occurred, check your network" }
    });
    let data = await response.json();
    if (response.status === 200) {
        return { successful: true, userToken: data.token };
    }
    else {
        let message = "";
        if (response.status === 409)
            message = "Email already exists";
        else if (response.status === 400)
            message = "Enter email and password";
        else
            message = "An error occurred, please try again";
        return { successful: false, message: message };
    }
}
export { signInRequest, signUpRequest }