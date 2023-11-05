let express= require('express');
let app=express();

let router=express.Router()


let courses=[
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
        "courseName": "Web development",
        "teacherName": "Simo",
        "timing": {
          "startingDate": "2023-12-28",
          "endingDate": "2024-05-28",
          "duration": "5 months"
        },
        "courseCode": "IT00AC90-3069",
        "courseObjectives": "Learn about Web development",
        "credits": 5,
        "implementationMethod": "online"
      }
]

router.get('/courses', function(req,res,next){
    let searchObject={
        "name": req.query.name,
        "teacher_name":req.query.teacher_name,
    }
    res.status(200).json(courses);
});


router.get('/courses/:courseCode', function(req, res, next) {
  const courseCode = req.params.courseCode;
  const course = courses.find((course) => course.courseCode === courseCode);

  if (!course) {
      return res.status(404).json({ message: 'Course not found' });
  }

  return res.status(200).json(course);
});

app.use('/api/',router);
var server=app.listen(5000,function(){
    console.log('Node server is running on 5000 and localhost');
});