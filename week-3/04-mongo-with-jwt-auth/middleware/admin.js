const {Admin} = require('../db/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// token verification function
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

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.body.username;
    const password = req.body.password;
    const token = req.headers.authorization.split(" ")[1];

    const isPresent = await Admin.findOne({
        username: username
    })
    
    if(isPresent != null){
        // verify password
        const isAuthenticated = await bcrypt.compare(password, isPresent.password);
        if(isAuthenticated === true){
            // verifyJWT
            if(verifyJWT(token)){
                next();
            }
            else{
                res.json({msg: "Not authorized."})
            }
        }
        else{
            res.json({msg: "Incorrect password!"})
        }
    }
    else{
        res.json({msg: "Not Authorized. Only Admins Allowed"})
    }
    
}

module.exports = adminMiddleware;