const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const User = require('../db/index')
const Course = require('../db/index')
const bcryptjs = require('bcryptjs')

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    // step 1 - get the data from the requests
    const username = req.headers.username;
    const password = req.headers.password;

    const hashedPass = bcryptjs.hash(password, 8);

    // step 2 - create a document (sync)
    const user = new User({username: username, password: hashedPass});

    // step 3 - save the document (async)
    const newUser = user.save();

    // step 4 - send the response
    res.send({message: 'User created successfully!', payload: newUser})
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    
    // step 1 - fetch all the courses
    const courses = await Course.find();

    // step 2 - send response back
    if(courses.length != 0){
        res.send(courses);
    }
    else{
        res.send({message: 'No courses stored in db.'})
    }

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    // step 1 - extract data from url
    const courseId = req.query.courseId;

    // step 2 - fetch the courses from the db
    const course = await Course.findOne({_id: courseId})

    course._id = courseId;

    await course.save();

    // step 3 - send the response back
    res.send({message: 'course purchased successfully!'});
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router