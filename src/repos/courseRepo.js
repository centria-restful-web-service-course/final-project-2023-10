let fs = require('fs');
const FILE_NAME = './assets/courses.json';

let courseRepo = {
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) { 
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    },
    getByCode: function(code, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) { 
                reject(err);
            } else {
                let course = JSON.parse(data).find(c => c.courseCode === code);
                resolve(course);
            }
        });
    },
    search: function(params, resolve, reject) {

    }
}

module.exports = courseRepo;