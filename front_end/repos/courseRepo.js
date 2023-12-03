// let fs=require('fs')
// const FILE_NAME='./assets/courses.json'

// let courseRepo = {
//     get: function(resolve, reject) {
//         fs.readFile(FILE_NAME, function(err, data) {
//             if (err) { 
//                 reject(err);
//             } else {
//                 resolve(JSON.parse(data));
//             }
//         });
//     },
//     getByCode: function(code, resolve, reject) {
//         fs.readFile(FILE_NAME, function(err, data) {
//             if (err) { 
//                 reject(err);
//             } else {
//                 let course = JSON.parse(data).find(c => c.courseCode === code);
//                 resolve(course);
//             }
//         });
//     },
//     search: function(params, resolve, reject) {
//         //by name,teacherName
//         fs.readFile(FILE_NAME, function(err, data) {
//             if (err) { 
//                 reject(err);
//             } else {
//                 let courses=JSON.parse(data)
//                 //console.log(params);
//                 if(params){
//                     courses=courses.filter(c=>(params.name ? c.courseName===params.name:true)&&
//                     (params.teacherName ? c.teacherName=== params.teacherName:true));
//                     //console.log(courses);
//                     resolve(courses);

//                 }else{
//                     resolve(courses);

//                 }               
//             }
//         });

//     },

//     insert: function(newCourse, resolve, reject) {
//         fs.readFile(FILE_NAME, function(err, data) {
//             if (err) { 
//                 reject(err);
//             } else {
//                 let currentCourses = JSON.parse(data);
//                 currentCourses.push(newCourse);
//                 fs.writeFile(FILE_NAME, JSON.stringify(currentCourses), function (err) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(newCourse);
//                     }
//                 });               
//             }
//         });
//     },

//     updateByCode: function(code, updatedCourse, resolve, reject) {
//         fs.readFile(FILE_NAME, function(err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 let courses = JSON.parse(data);
//                 let index = courses.findIndex(c => c.courseCode === code);
    
//                 if (index !== -1) {
//                     courses[index] = updatedCourse;
//                     fs.writeFile(FILE_NAME, JSON.stringify(courses), function (err) {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve(updatedCourse);
//                         }
//                     });
//                 } else {
//                     reject({ message: "Course not found" });
//                 }
//             }
//         });
//     },

//     deleteByCode: function(code, resolve, reject) {
//         fs.readFile(FILE_NAME, function(err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 let courses = JSON.parse(data);
//                 let filteredCourses = courses.filter(c => c.courseCode !== code);
    
//                 if (filteredCourses.length < courses.length) {
//                     fs.writeFile(FILE_NAME, JSON.stringify(filteredCourses), function (err) {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve({ message: 'Course deleted successfully' });
//                         }
//                     });
//                 } else {
//                     reject({ message: "Course not found" });
//                 }
//             }
//         });
//     }

// }
// module.exports=courseRepo;


//-------------------using mongodb--------------------

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://fullstack:NEoo6psFuZ1Djsmo@cluster0.0fhze4m.mongodb.net/restfulWebService?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let courseRepo = {
    connect: async function () {
        try {
            await client.connect();
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    },

    disconnect: async function () {
        try {
            await client.close();
        } catch (error) {
            console.error('Error closing the database connection:', error);
            throw error;
        }
    },

    get: async function () {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("courses");
            const courses = await collection.find({}).toArray();
            return courses;
        } catch (error) {
            console.error('Error getting courses:', error);
            throw error;
        }
    },

    getByCode: async function (code) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("courses");
            const course = await collection.findOne({ courseCode: code });
            return course;
        } catch (error) {
            console.error('Error getting course by code:', error);
            throw error;
        }
    },

    search: async function (params) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("courses");

            let query = {};
            if (params) {
                if (params.name) {
                    query.courseName = params.name;
                }
                if (params.teacherName) {
                    query.teacherName = params.teacherName;
                }
            }

            const courses = await collection.find(query).toArray();
            return courses;
        } catch (error) {
            console.error('Error searching courses:', error);
            throw error;
        }
    },

    insert: async function (newCourse) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("courses");
            const result = await collection.insertOne(newCourse);
            return newCourse;
        } catch (error) {
            console.error('Error inserting course:', error);
            throw error;
        }
    },

    updateByCode: async function (code, updatedCourse) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("courses");
            const result = await collection.replaceOne({ courseCode: code }, updatedCourse);
            if (result.modifiedCount > 0) {
                return updatedCourse;
            } else {
                throw { message: "Course not found" };
            }
        } catch (error) {
            console.error('Error updating course by code:', error);
            throw error;
        }
    },

    deleteByCode: async function (code) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("courses");
            const result = await collection.deleteOne({ courseCode: code });

            if (result.deletedCount > 0) {
                return { message: 'Course deleted successfully' };
            } else {
                throw { message: "Course not found" };
            }
        } catch (error) {
            console.error('Error deleting course by code:', error);
            throw error;
        }
    }
};

module.exports = courseRepo;

