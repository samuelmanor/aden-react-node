const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// READ
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("The course with the given ID was not found.");
        return;
    };
    res.send(course);
});

// CREATE
app.post('/api/courses', (req, res) => {
    //error handling
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name is required and should be at minimum 3 characters')
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// UPDATE
app.put('/api/courses/:id', (req, res) => {
    // look up the course
    // if it doesnt exist, 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("The course with the given ID was not found.");
        return;
    };

    // validate
    // if invalid, 400
    // update
    course.name = req.body.name;
    // return updated course
    res.send(course);
});

// DESTROY
app.delete('/api/courses/:id', (req, res) => {
    // look up course with given id
    // if it doesnt exist, 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("The course with the given ID was not found.");
        return;
    };

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return course that was deleted
    res.send(course);
});


// sudo mongod --dbpath /Users/smanor/development/data/db

// $ 'npx nodemon index.js'
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));