let express= require('express');
let courseRepo= require('./repos/courseRepo')
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

app.use('/api/',router);
var server=app.listen(5000,function(){
    console.log('Node server is running on 5000 and localhost');
});