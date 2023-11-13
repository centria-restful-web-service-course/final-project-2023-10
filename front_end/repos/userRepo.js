let fs = require('fs');
const USER_FILE = './assets/users.json';

let userRepo = {
    getAll: function (resolve, reject) {
        fs.readFile(USER_FILE, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    },

    search: function (params, resolve, reject) {
        fs.readFile(USER_FILE, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let users = JSON.parse(data);
                if (!params || !params.userType) {
                    reject({ message: "Invalid user type" });
                    return;
                }

                if (params.userType === 'student') {
                    users = users.students || [];
                } else if (params.userType === 'teacher') {
                    users = users.teachers || [];
                } else {
                    reject({ message: "Invalid user type" });
                    return;
                }

                if (params.name) {
                    users = users.filter(user => user.name === params.name);
                }

                resolve(users);
            }
        });
    },

    createStudent: function (newStudent, resolve, reject) {
        fs.readFile(USER_FILE, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let users = JSON.parse(data);
                users.students = users.students || [];
                users.students.push(newStudent);

                fs.writeFile(USER_FILE, JSON.stringify(users), function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(newStudent);
                    }
                });
            }
        });
    },

    createTeacher: function (newTeacher, resolve, reject) {
        fs.readFile(USER_FILE, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let users = JSON.parse(data);
                users.teachers = users.teachers || [];
                users.teachers.push(newTeacher);

                fs.writeFile(USER_FILE, JSON.stringify(users), function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(newTeacher);
                    }
                });
            }
        });
    },
};

module.exports = userRepo;
