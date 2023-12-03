// let express= require('express');
// let courseRepo= require('./repos/courseRepo')
// let userRepo=require('./repos/userRepo')
// let enrollmentRepo = require('./repos/enrollmentRepo');
// let app=express();
// app.use(express.json());
// let router=express.Router()

// router.get('/courses/:code', function (req, res, next) {
//   let courseCode = req.params.code;
//   courseRepo.getByCode(courseCode,
//       function(data) {
//           res.status(200).json(data);
//       },  
//       function(err) {
//           next(err);
//       }
//   );
// });

// router.get('/courses', function (req, res, next) {
//   let searchParams={
//     name:req.query.name,
//     teacherName:req.query.teacherName,
//   }
//   if (searchParams.name || searchParams.teacherName) {
//     courseRepo.search(searchParams, 
//         function(data) {
//             res.status(200).json(data);
//         }, 
//         function(err) {
//             next(err);
//         })
// } else {
//     courseRepo.get(
//         function(data) {
//             res.status(200).json(data);
//         }, 
//         function(err) {
//             next(err);
//         }
//     );
// }
// });

// router.post('/courses', function (req, res, next) {
// console.log(req.body);  
// let newCourse = req.body;
// courseRepo.insert(newCourse, 
//     function(data) {
//         res.status(201).json(data);
//     }, 
//     function(err) {
//         next(err);
//     });
// })

// router.put('/courses/:code', function (req, res, next) {
//     let courseCode = req.params.code;
//     let updatedCourse = req.body;
//     courseRepo.updateByCode(courseCode, updatedCourse,
//       function (data) {
//         res.status(200).json(data);
//       },
//       function (err) {
//         next(err);
//       });
//   });

//   router.delete('/courses/:code', function (req, res, next) {
//     let courseCode = req.params.code;
//     courseRepo.deleteByCode(courseCode,
//       function () {
//         res.status(204).send();
//       },
//       function (err) {
//         next(err);
//       });
//   });

//   router.get('/users', function (req, res, next) {
//     let userType = req.query.userType;

//     if (!userType) {
//         userRepo.getAll(
//             function (data) {
//                 res.status(200).json(data);
//             },
//             function (err) {
//                 next(err);
//             }
//         );
//     } else if (userType === 'student') {
//         userRepo.search({ userType },
//             function (data) {
//                 res.status(200).json(data);
//             },
//             function (err) {
//                 next(err);
//             });
//     } else if (userType === 'teacher') {
//         userRepo.search({ userType },
//             function (data) {
//                 res.status(200).json(data);
//             },
//             function (err) {
//                 next(err);
//             });
//     } else {
//         res.status(400).json({ message: "Invalid user type" });
//     }
// });


//   router.post('/users', function (req, res, next) {
//     let userType = req.query.userType;
//     let newUser = req.body;

//     if (userType === 'student') {
//         userRepo.createStudent(newUser,
//             function(data) {
//                 res.status(201).json(data);
//             },
//             function(err) {
//                 next(err);
//             });
//     } else if (userType === 'teacher') {
//         userRepo.createTeacher(newUser,
//             function(data) {
//                 res.status(201).json(data);
//             },
//             function(err) {
//                 next(err);
//             });
//     } else {
//         res.status(400).json({ message: "Invalid user type" });
//     }
// });

// router.get('/enrollments', function (req, res, next) {
//     enrollmentRepo.getAll(
//         function (data) {
//             res.status(200).json(data);
//         },
//         function (err) {
//             next(err);
//         });
// });

// router.get('/enrollments/:enrollment_id', function (req, res, next) {
//     let enrollmentId = req.params.enrollment_id;

//     enrollmentRepo.getByEnrollmentId(enrollmentId,
//         function (data) {
//             res.status(200).json(data);
//         },
//         function (err) {
//             next(err);
//         });
// });

// router.post('/enrollments', function(req, res, next) {
//     let newEnrollment = req.body;
//     enrollmentRepo.create(newEnrollment,
//         function(data) {
//             res.status(201).json(data);
//         },
//         function(err) {
//             next(err);
//         });
// });

// router.put('/enrollments/:enrollment_id', function(req, res, next) {
//     let enrollmentId = req.params.enrollment_id;
//     let updatedEnrollment = req.body;
//     enrollmentRepo.updateById(enrollmentId, updatedEnrollment,
//         function(data) {
//             res.status(200).json(data);
//         },
//         function(err) {
//             next(err);
//         });
// });

//   app.use('/api/',router);
// var server=app.listen(5000,function(){
//     console.log('Node server is running on 5000 and localhost');
// });



//-------------------using mongodb--------------------

const express = require('express');
const courseRepo = require('./repos/courseRepo');
const userRepo = require('./repos/userRepo');
const enrollmentRepo = require('./repos/enrollmentRepo');
const app = express();
app.use(express.json());
const router = express.Router();

router.get('/courses/:code', async (req, res, next) => {
  try {
    let courseCode = req.params.code;
    let data = await courseRepo.getByCode(courseCode);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/courses', async (req, res, next) => {
  try {
    let searchParams = {
      name: req.query.name,
      teacherName: req.query.teacherName,
    };
    let data;
    if (searchParams.name || searchParams.teacherName) {
      data = await courseRepo.search(searchParams);
    } else {
      data = await courseRepo.get();
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/courses', async (req, res, next) => {
  try {
    let newCourse = req.body;
    let data = await courseRepo.insert(newCourse);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/courses/:code', async (req, res, next) => {
  try {
    let courseCode = req.params.code;
    let updatedCourse = req.body;
    let data = await courseRepo.updateByCode(courseCode, updatedCourse);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/courses/:code', async (req, res, next) => {
  try {
    let courseCode = req.params.code;
    await courseRepo.deleteByCode(courseCode);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    let userType = req.query.userType;
    let data;
    if (!userType) {
      data = await userRepo.getAll();
    } else if (userType === 'Student' || userType === 'Teacher') {
      data = await userRepo.search({ userType });
    } else {
      res.status(400).json({ message: "Invalid user type" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    let userType = req.query.userType;
    let newUser = req.body;
    let data;

    if (userType === 'Student') {
      data = await userRepo.createStudent(newUser);
    } else if (userType === 'Teacher') {
      data = await userRepo.createTeacher(newUser);
    } else {
      res.status(400).json({ message: "Invalid user type" });
      return;
    }

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});


router.get('/enrollments', async (req, res, next) => {
  try {
    let data = await enrollmentRepo.getAll();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/enrollments/:enrollment_id', async (req, res, next) => {
  try {
    let enrollmentId = req.params.enrollment_id;
    let data = await enrollmentRepo.getByEnrollmentId(enrollmentId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/enrollments', async (req, res, next) => {
  try {
    let newEnrollment = req.body;
    let data = await enrollmentRepo.create(newEnrollment);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/enrollments/:enrollment_id', async (req, res, next) => {
  try {
    let enrollmentId = req.params.enrollment_id;
    let updatedEnrollment = req.body;
    let data = await enrollmentRepo.updateById(enrollmentId, updatedEnrollment);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

app.use('/api/', router);
var server = app.listen(5000, function () {
  console.log('Node server is running on 5000 and localhost');
});
