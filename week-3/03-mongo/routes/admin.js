const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const bcryptjs = require('bcryptjs')
const Admin = require('../db/index')
const Course = require('../db/index')

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    
    // step 1 - gt the input from the request
    const username = req.headers.username;
    const password = req.headers.password;

    // step 2 - hash the password
    const hashedPass = await bcryptjs.hash(password, 8);

    // step 3 - store the credentials in the DB, create a new document (sync)
    let user = new Admin({username: username, password: hashedPass});
    console.log('user: ', user);

    // step 4 - save the document in the DB (async)
    let newUser = await user.save();
    console.log('newUser: ', newUser);

    // step 4 - send back the response
    res.send({message: 'Admin created successfully!', payload: newUser});
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    // step 1 - get the input from the request
    const courseInfo = req.body;

    // step 2 - create a new document (sync)
    let course = new Course(courseInfo)

    // step 3 - save the document in the DB (async)
    let newCourse = await course.save()

    // step 3 - send back the response
    res.send({message: 'Course created successfully', courseId: newCourse._id})
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    // step 1 - fetch the documents stored in DB
    let courses = await Course.find()

    if(courses.length != 0){
        res.send({courses: courses})
    }
    else{
        res.send({message: 'no courses stored in Database!'})
    }
});



module.exports = router;