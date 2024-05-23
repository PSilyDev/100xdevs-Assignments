const Admin = require('../db/index')

// Middleware for handling auth

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;

    const arr = await Admin.find({username : username});

    if(arr.length != 0){
        next();
    }
    else{
        res.send({message: 'Only admins are allowed'});
        return;
    }
}

module.exports = adminMiddleware;