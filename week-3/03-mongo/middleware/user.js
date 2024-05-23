const User = require('../db/index')

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    // step 1 - get data from request
    const username = req.headers.username;

    // step 2 - check if the user in present in db
    const arr = await User.find({username: username});

    if(arr.length != 0){
        next();
    }
    else{
        res.send({message: "only Users are allowed!"})
        return;
    }
    
}

module.exports = userMiddleware;