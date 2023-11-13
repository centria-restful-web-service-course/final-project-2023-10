let express= require('express');
let courseRepo= require('./repos/courseRepo')
let userRepo=require('./repos/userRepo')
let enrollmentRepo = require('./repos/enrollmentRepo');
let app=express();
app.use(express.json());
let router=express.Router()

router.get('/courses/:code', function (req, res, next) {
  let courseCode = req.params.code;
  courseRepo.getByCode(courseCode,
      function(data) {
          res.status(200).json(data);
      },  
      function(err) {
          next(err);
      }
  );
});

router.get('/courses', function (req, res, next) {
  let searchParams={
    name:req.query.name,
    teacherName:req.query.teacherName,
  }
  if (searchParams.name || searchParams.teacherName) {
    courseRepo.search(searchParams, 
        function(data) {
            res.status(200).json(data);
        }, 
        function(err) {
            next(err);
        })
} else {
    courseRepo.get(
        function(data) {
            res.status(200).json(data);
        }, 
        function(err) {
            next(err);
        }
    );
}
});

router.post('/courses', function (req, res, next) {
console.log(req.body);  
let newCourse = req.body;
courseRepo.insert(newCourse, 
    function(data) {
        res.status(201).json(data);
    }, 
    function(err) {
        next(err);
    });
})

router.put('/courses/:code', function (req, res, next) {
    let courseCode = req.params.code;
    let updatedCourse = req.body;
    courseRepo.updateByCode(courseCode, updatedCourse,
      function (data) {
        res.status(200).json(data);
      },
      function (err) {
        next(err);
      });
  });

  router.delete('/courses/:code', function (req, res, next) {
    let courseCode = req.params.code;
    courseRepo.deleteByCode(courseCode,
      function () {
        res.status(204).send();
      },
      function (err) {
        next(err);
      });
  });

  router.get('/users', function (req, res, next) {
    let userType = req.query.userType;

    if (!userType) {
        userRepo.getAll(
            function (data) {
                res.status(200).json(data);
            },
            function (err) {
                next(err);
            }
        );
    } else if (userType === 'student') {
        userRepo.search({ userType },
            function (data) {
                res.status(200).json(data);
            },
            function (err) {
                next(err);
            });
    } else if (userType === 'teacher') {
        userRepo.search({ userType },
            function (data) {
                res.status(200).json(data);
            },
            function (err) {
                next(err);
            });
    } else {
        res.status(400).json({ message: "Invalid user type" });
    }
});


  router.post('/users', function (req, res, next) {
    let userType = req.query.userType;
    let newUser = req.body;

    if (userType === 'student') {
        userRepo.createStudent(newUser,
            function(data) {
                res.status(201).json(data);
            },
            function(err) {
                next(err);
            });
    } else if (userType === 'teacher') {
        userRepo.createTeacher(newUser,
            function(data) {
                res.status(201).json(data);
            },
            function(err) {
                next(err);
            });
    } else {
        res.status(400).json({ message: "Invalid user type" });
    }
});

router.get('/enrollments', function (req, res, next) {
    enrollmentRepo.getAll(
        function (data) {
            res.status(200).json(data);
        },
        function (err) {
            next(err);
        });
});

router.get('/enrollments/:enrollment_id', function (req, res, next) {
    let enrollmentId = req.params.enrollment_id;

    enrollmentRepo.getByEnrollmentId(enrollmentId,
        function (data) {
            res.status(200).json(data);
        },
        function (err) {
            next(err);
        });
});

router.post('/enrollments', function(req, res, next) {
    let newEnrollment = req.body;
    enrollmentRepo.create(newEnrollment,
        function(data) {
            res.status(201).json(data);
        },
        function(err) {
            next(err);
        });
});

router.put('/enrollments/:enrollment_id', function(req, res, next) {
    let enrollmentId = req.params.enrollment_id;
    let updatedEnrollment = req.body;
    enrollmentRepo.updateById(enrollmentId, updatedEnrollment,
        function(data) {
            res.status(200).json(data);
        },
        function(err) {
            next(err);
        });
});

  app.use('/api/',router);
var server=app.listen(5000,function(){
    console.log('Node server is running on 5000 and localhost');
});