const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require('../db/index');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    // get data from body
    const username = req.body.username;
    const password = req.body.password;

    // hash the password
    const hashedPassword = await bcryptjs.hash(password, 8);

    // store the data in db
    const isInserted = new Admin({username: username, password: hashedPassword});
    
    isInserted.save();

    // send res back
    res.json({msg: "Admin created successfully."})
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic

    // get data from body
    const username = req.body.username;
    const password = req.body.password;

    // compare the data in the db
    const isPresent = await Admin.findOne({username: username});
    if(isPresent != null){
        // check for password
        isAuthenticated = await bcryptjs.compare(password, isPresent.password);
        if(isAuthenticated === true){
            // signin succesfull

            // create a jwt token
            const signedToken = jwt.sign({username: username}, 'abcdefgh');
            
            // send back the response
            res.json({token: signedToken});
        }
        else{
            res.json({msg: "Incorrect password."});
        }
    }
    else{
        res.json({msg: "Create an account first."})
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    
    // get data from body
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    // store the data in Course db
    const isInserted = new Course({title: title, description: description, price: price, imageLink: imageLink})
    isInserted.save()

    // send res back
    res.json({msg: "Course created successfully.", courseId: isInserted._id});
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    
    // fetch all the Courses
    isPresent = await Course.find();

    // send res back
    res.json({courses: isPresent});
});

module.exports = router;