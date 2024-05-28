const {User} = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function verifyJWT(token){
    let ans = true;
    try{
        jwt.verify(token, 'abcdefgh');
    }
    catch(e){
        ans = false;
    }
    return ans;
}

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    // get data from res
    const username = req.body.username;
    const password = req.body.password;
    const token = req.headers.authorization.split(" ")[1];

    // check if cuser exists in the User DB
    const isPresent = await User.findOne({username: username});

    if(isPresent !== null){
        // verify password
        const isAuthenticated = await bcrypt.compare(password, isPresent.password);
        if(isAuthenticated === true){
            // verify token
            if(verifyJWT(token)){
                next();
            }
            else{
                res.json({msg: "Not Authorized."});
            }
        }
        else{
            res.json({msg: "Incorrect password."});
        }
    }
    else{
        res.json({msg: "Not Authorized. Only Users allowed."})
    }
}

module.exports = userMiddleware;