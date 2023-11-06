let express = require('express');
let courseRepo = require('./repos/courseRepo');
let app = express();

let router = express.Router();

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

    courseRepo.get(
        function(data) {
            res.status(200).json(data);
        }, 
        function(err) {
            next(err);
        }
    );
});

app.use('/api/', router);

var server = app.listen(5000, function() {
    console.log('Node server is running on port 5000 and localhost');
});
