let fs = require('fs');
const ENROLLMENT_FILE = './assets/enrollments.json';

let enrollmentRepo = {
    getAll: function(resolve, reject) {
        fs.readFile(ENROLLMENT_FILE, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    },

    create: function(newEnrollment, resolve, reject) {
        fs.readFile(ENROLLMENT_FILE, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let enrollments = JSON.parse(data) || [];
                enrollments.push(newEnrollment);

                fs.writeFile(ENROLLMENT_FILE, JSON.stringify(enrollments), function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(newEnrollment);
                    }
                });
            }
        });
    },

    updateById: function(enrollmentId, updatedEnrollment, resolve, reject) {
        fs.readFile(ENROLLMENT_FILE, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let enrollments = JSON.parse(data) || [];
                let index = enrollments.findIndex(e => e.enrollment_id === enrollmentId);

                if (index !== -1) {
                    enrollments[index] = { ...enrollments[index], ...updatedEnrollment };

                    fs.writeFile(ENROLLMENT_FILE, JSON.stringify(enrollments), function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(updatedEnrollment);
                        }
                    });
                } else {
                    reject({ message: 'Enrollment not found' });
                }
            }
        });
    },
};

module.exports = enrollmentRepo;