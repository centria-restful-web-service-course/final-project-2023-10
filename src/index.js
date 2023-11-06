const express = require('express');
const app = express();

const router = express.Router();



// Mount the router on the app
app.use('/api/', router);

let courses = [
{
    "courseName": "Rest API",
    "teacherName": "Simo",
    "timing": {
      "startingDate": "2023-08-28",
      "endingDate": "2023-12-28",
      "duration": "3 months"
    },
    "courseCode": "IT00AC90-3006",
    "courseObjectives": "Learn about Rest architecture",
    "credits": 5,
    "implementationMethod": "In-person"
  },
  {
    "courseName": "physics",
    "teacherName": "Simo",
    "timing": {
      "startingDate": "2023-08-28",
      "endingDate": "2023-12-28",
      "duration": "3 months"
    },
    "courseCode": "IT00AC90-3006",
    "courseObjectives": "Learn about Rest architecture",
    "credits": 5,
    "implementationMethod": "In-person"
  }];

  router.get('/courses', function(req, res,next) {
    // res.send(courses);
    let searchObject = {
        "name": req.query.name,
        "teacher_name": req.query.teacher_name
    }
    res.status(200).json(courses)
});



const server = app.listen(5000, function() {
    console.log("Server running on http://localhost:5000");
});
