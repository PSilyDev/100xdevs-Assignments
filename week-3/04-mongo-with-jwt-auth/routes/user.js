const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const bcrypt = require('bcryptjs');
const {User, Course} = require('../db/index');
const jwt = require('jsonwebtoken');

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    // get data from res
    const username = req.body.username;
    const password = req.body.password;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // store the cred in User DB
    const isStored = new User({username: username, password: hashedPassword});
    isStored.save();

    // send back the response
    res.json({msg: "User created successfully."});
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic

    // get data from the user
    const username = req.body.username;
    const password = req.body.password;

    // check if user exists in User DB
    const isPresent = await User.findOne({username: username});
    if(isPresent !== null){
        // verify password
        const isAuthenticated = await bcrypt.compare(password, isPresent.password);
        if(isAuthenticated === true){
            // create jwt token
            const signedToken = jwt.sign({username: username}, 'abcdefgh');
            res.json({token: signedToken});
        }
        else{
            res.json({msg: "Incorrect password."});
        }
    }
    else{
        res.json({msg: "Create User account first."});
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic

    // get all the courses from the Course DB
    const isStored = await Course.find();

    // send back res
    if(isStored){
        res.json({courses: isStored});
    }
    else{
        res.json({msg: "No courses present."});
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    // get data from the res
    const courseId = req.params.courseId;
    const username = req.body.username;

    // updte the the User DB
    const isUpdated = await User.updateOne({
        username: username
    }, {
        '$push':{
            purchasedCourses: courseId
        }
    });
    
    // send back the res
    if(isUpdated.acknowledged === true){
        res.json({msg: "Course purchased succesfully."})
    }
    else{
        res.json({msg: "Unable to purchase course."})
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    // get data from req
    const username = req.body.username;

    // get all the purchased courses from the User DB
    const isPresent = await User.find({username: username}).select('purchasedCourses') // since we have used find it will return array that's why [0]
    // console.log('purchasedCourses - ', isPresent[0].purchasedCourses);
        // or
        // const user = await User.findOne({ username: req.headers.username})
        // console.log(user.purchasedCourses)

    // get all the courses from Course where id present in isPresent
    const courses = await Course.find({_id: {
        "$in": isPresent[0].purchasedCourses
    }})
    
    // send back the response
    if(courses.length !== 0){
        res.json({purchasedCourses: purchasedCourses});
    }
    else{
        res.json({msg: "No courses purchased."})
    }
});

module.exports = router