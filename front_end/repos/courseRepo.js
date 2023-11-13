let fs=require('fs')
const FILE_NAME='./assets/courses.json'

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
        //by name,teacherName
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) { 
                reject(err);
            } else {
                let courses=JSON.parse(data)
                //console.log(params);
                if(params){
                    courses=courses.filter(c=>(params.name ? c.courseName===params.name:true)&&
                    (params.teacherName ? c.teacherName=== params.teacherName:true));
                    //console.log(courses);
                    resolve(courses);

                }else{
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
    },

    updateByCode: function(code, updatedCourse, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let courses = JSON.parse(data);
                let index = courses.findIndex(c => c.courseCode === code);
    
                if (index !== -1) {
                    courses[index] = updatedCourse;
                    fs.writeFile(FILE_NAME, JSON.stringify(courses), function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(updatedCourse);
                        }
                    });
                } else {
                    reject({ message: "Course not found" });
                }
            }
        });
    },

    deleteByCode: function(code, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let courses = JSON.parse(data);
                let filteredCourses = courses.filter(c => c.courseCode !== code);
    
                if (filteredCourses.length < courses.length) {
                    fs.writeFile(FILE_NAME, JSON.stringify(filteredCourses), function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ message: 'Course deleted successfully' });
                        }
                    });
                } else {
                    reject({ message: "Course not found" });
                }
            }
        });
    }

}
module.exports=courseRepo;