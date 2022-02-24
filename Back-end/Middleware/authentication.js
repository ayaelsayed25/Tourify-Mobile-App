const jwt = require("jsonwebtoken");
const config = process.env;
const Account = require('../Models/Account.js');

const verifyToken = (req, res, next) => {
    // console.log(req.headers)
    const token = req.body.email || req.headers['authorization'];
    console.log({ token })
    // console.log(token)
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);

        Account.findEmail(decoded.email, (err, user) => {
            if (err) {
                console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh")
                return res.status(500).json(err);
            }
            if (user.length == 0) {
                return res.status(404).json({ message: "user not found" });
            }
        })
        req.user_id = decoded.email;
        console.log(decoded.email)
        console.log("decoded.email")

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};

module.exports = verifyToken;