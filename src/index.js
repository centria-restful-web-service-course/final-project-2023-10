let express = require('express');
let app = express();

let router = express.Router();
router.get('/courses', function (req, res, next) {
    res.send('Here are the courses, abc');
})

var server = app.listen(5000, function() {
    console.log('Node server is running on port 5000 and localhost');
});