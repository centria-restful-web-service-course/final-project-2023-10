// let fs = require('fs');
// const ENROLLMENT_FILE = './assets/enrollments.json';

// let enrollmentRepo = {
//     getAll: function(resolve, reject) {
//         fs.readFile(ENROLLMENT_FILE, function(err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(JSON.parse(data));
//             }
//         });
//     },

//     create: function(newEnrollment, resolve, reject) {
//         fs.readFile(ENROLLMENT_FILE, function(err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 let enrollments = JSON.parse(data) || [];
//                 enrollments.push(newEnrollment);

//                 fs.writeFile(ENROLLMENT_FILE, JSON.stringify(enrollments), function(err) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(newEnrollment);
//                     }
//                 });
//             }
//         });
//     },

//     updateById: function(enrollmentId, updatedEnrollment, resolve, reject) {
//         fs.readFile(ENROLLMENT_FILE, function(err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 let enrollments = JSON.parse(data) || [];
//                 let index = enrollments.findIndex(e => e.enrollment_id === enrollmentId);

//                 if (index !== -1) {
//                     enrollments[index] = { ...enrollments[index], ...updatedEnrollment };

//                     fs.writeFile(ENROLLMENT_FILE, JSON.stringify(enrollments), function(err) {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve(updatedEnrollment);
//                         }
//                     });
//                 } else {
//                     reject({ message: 'Enrollment not found' });
//                 }
//             }
//         });
//     },
// };

// module.exports = enrollmentRepo;



//-------------------using mongodb--------------------

const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://fullstack:NEoo6psFuZ1Djsmo@cluster0.0fhze4m.mongodb.net/restfulWebService?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let enrollmentRepo = {
    getAll: async function () {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("enrollments");
            const enrollments = await collection.find({}).toArray();
            return enrollments;
        } catch (error) {
            console.error('Error getting enrollments:', error);
            throw error;
        }
    },

    create: async function (newEnrollment) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("enrollments");
            const result = await collection.insertOne(newEnrollment);
            return newEnrollment;
        } catch (error) {
            console.error('Error creating enrollment:', error);
            throw error;
        }
    },

    updateById: async function (enrollmentId, updatedEnrollment) {
        try {
            const database = client.db("restfulWebService");
            const collection = database.collection("enrollments");
            const result = await collection.updateOne({ enrollment_id: enrollmentId }, { $set: updatedEnrollment });
    
            if (result.modifiedCount > 0) {
                return updatedEnrollment;
            } else {
                throw { message: "Enrollment not found" };
            }
        } catch (error) {
            console.error('Error updating enrollment by ID:', error);
            throw error;
        }
    },
};

module.exports = enrollmentRepo;
