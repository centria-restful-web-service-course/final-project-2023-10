const express = require('express');
const app = express();

const router = express.Router();



// Mount the router on the app
app.use('/api/', router);
router.use(express.json());
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

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
        "teacher_name": req.query.teacher_name,
        "course_code": req.query.course_code
    }
    res.status(200).json(courses)
});

router.get('/courses', function(req, res, next) {
  // Return details of all courses
  res.status(200).json(courses);
});

router.post('/course', function (req, res, next) {
  try {
  const {
    courseName,
    teacherName,
    timing: {
      startingDate,
      endingDate,
      duration
    },
    courseCode,
    courseObjectives,
    credits,
    implementationMethod
  } = req.body;

  if (
    !courseName ||
    !teacherName ||
    !startingDate ||
    !endingDate ||
    !duration ||
    !courseCode ||
    !courseObjectives ||
    !credits ||
    !implementationMethod
  ) {
    // Return a 400 "Bad Request" response if any required data is missing
    return res.status(400).json({ message: 'Invalid input' });
  } else {
    // Persist the data (store or process it)
    res.status(201).json({
      courseName,
      message: 'created'
    });
  }
} catch (error)
{
  res.status(500).json({ message: 'sumting wong' });
}
});

router.put('/course/:courseCode', (req, res) => {
  try {
    const {
      courseName,
      teacherName,
      timing: {
        startingDate,
        endingDate,
        duration
      },
      courseObjectives,
      credits,
      implementationMethod
    } = req.body;
    res.status(200).json({ message: 'Resource updated' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});




// router.put('/course/:courseCode', (req, res) => {
//   const { courseCode } = req.params;
//   // const updatedCourse = req.body; // New course data to update
//   const {
//     courseName,
//     teacherName,
//     timing: {
//       startingDate,
//       endingDate,
//       duration
//     },
//     courseObjectives,
//     credits,
//     implementationMethod
//   } = req.body;
  

//   if (true/* check if the resource was successfully updated */) {
//     res.status(200).json({
//       courseCode,
//       updatedCourse,
//       message: 'Resource updated'
//     });
//   } else {
//     res.status(404).json({ message: 'Resource not found' });
//   }
// });


const server = app.listen(5000, function() {
    console.log("Server running on http://localhost:5000");
});
