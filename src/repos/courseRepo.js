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
        // name, teacherName
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) { 
                reject(err);
            } else {
                let courses = JSON.parse(data);
                console.log(params);
                if (params) {
                    courses = courses.filter(c => (params.name ? c.courseName === params.name : true) && 
                        (params.teacherName ? c.teacherName === params.teacherName : true));
                    console.log(courses);
                    resolve(courses);
                } else {
                    resolve(courses);
                }
            }
        });
    },
    insert: function(newCourse, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) { 
                reject(err);
            } else {
                let currentCourses = JSON.parse(data);
                currentCourses.push(newCourse);
                fs.writeFile(FILE_NAME, JSON.stringify(currentCourses), function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(newCourse);
                    }
                });               
            }
        });
    }
}

module.exports = courseRepo;