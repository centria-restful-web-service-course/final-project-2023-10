// let fs = require('fs');
// const USER_FILE = './assets/users.json';

// let userRepo = {
//     getAll: function (resolve, reject) {
//         fs.readFile(USER_FILE, function (err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(JSON.parse(data));
//             }
//         });
//     },

//     search: function (params, resolve, reject) {
//         fs.readFile(USER_FILE, function (err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 let usersArray = JSON.parse(data);

//                 if (!Array.isArray(usersArray) || usersArray.length === 0) {
//                     reject({ message: "Invalid user data format" });
//                     return;
//                 }

//                 let users = usersArray[0];

//                 if (!params || !params.userType) {
//                     reject({ message: "Invalid user type" });
//                     return;
//                 }

//                 if (params.userType === 'student') {
//                     users = users.students || [];
//                 } else if (params.userType === 'teacher') {
//                     users = users.teachers || [];
//                 } else {
//                     reject({ message: "Invalid user type" });
//                     return;
//                 }

//                 if (params.name) {
//                     users = users.filter(user => user.name === params.name);
//                 }

//                 resolve(users);
//             }
//         });
//     },

//     createStudent: function (newStudent, resolve, reject) {
//         fs.readFile(USER_FILE, function (err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 let usersArray = JSON.parse(data);

//                 if (!Array.isArray(usersArray) || usersArray.length === 0) {
//                     reject({ message: "Invalid user data format" });
//                     return;
//                 }

//                 let users = usersArray[0];
//                 users.students = users.students || [];
//                 users.students.push(newStudent);

//                 fs.writeFile(USER_FILE, JSON.stringify(usersArray), function (err) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(newStudent);
//                     }
//                 });
//             }
//         });
//     },

//     createTeacher: function (newTeacher, resolve, reject) {
//         fs.readFile(USER_FILE, function (err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 let usersArray = JSON.parse(data);

//                 if (!Array.isArray(usersArray) || usersArray.length === 0) {
//                     reject({ message: "Invalid user data format" });
//                     return;
//                 }

//                 let users = usersArray[0];
//                 users.teachers = users.teachers || [];
//                 users.teachers.push(newTeacher);

//                 fs.writeFile(USER_FILE, JSON.stringify(usersArray), function (err) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(newTeacher);
//                     }
//                 });
//             }
//         });
//     },
// };

// module.exports = userRepo;

const { MongoClient } = require('mongodb');



//-------------------using mongodb--------------------

const uri = "mongodb+srv://fullstack:NEoo6psFuZ1Djsmo@cluster0.0fhze4m.mongodb.net/restfulWebService?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let userRepo = {

    getAll: async function () {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("users");
            const users = await collection.find({}).toArray();
            return users;
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    },

    search: async function (params) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("users");
    
            let query = {};
    
            if (params && params.userType) {
                const userTypeLower = params.userType.toLowerCase();
    
                if (userTypeLower === 'student' || userTypeLower === 'teacher') {
                    query[`${userTypeLower}s`] = { $exists: true };
    
                    if (params.name) {
                        query[`${userTypeLower}s.name`] = params.name;
                    }
                } else {
                    throw { message: "Invalid user type" };
                }
            }
    
            const users = await collection.find(query).toArray();
    
            if (params && params.userType) {
                const userTypeLower = params.userType.toLowerCase();
                return users[0][`${userTypeLower}s`] || [];
            } else {
                return users;
            }
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    },
    
    
    
    createStudent: async function (newStudent) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("users");
            const result = await collection.updateOne({}, { $push: { students: newStudent } });
            if (result.modifiedCount > 0) {
                return newStudent;
            } else {
                throw { message: "User not found" };
            }
        } catch (error) {
            console.error('Error creating student:', error);
            throw error;
        }
    },

    createTeacher: async function (newTeacher) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("users");
            const result = await collection.updateOne({}, { $push: { teachers: newTeacher } });
            if (result.modifiedCount > 0) {
                return newTeacher;
            } else {
                throw { message: "User not found" };
            }
        } catch (error) {
            console.error('Error creating teacher:', error);
            throw error;
        }
    },
};

module.exports = userRepo;
