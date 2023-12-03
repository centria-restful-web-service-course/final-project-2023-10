const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = "mongodb+srv://fullstack:NEoo6psFuZ1Djsmo@cluster0.0fhze4m.mongodb.net/restfulWebService?retryWrites=true&w=majority";
const databaseName = "restfulWebService";

const readJsonFile = (filePath) => {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};

const insertData = async (collection, data) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(databaseName);
    const result = await database.collection(collection).insertMany(data);
    console.log(`Inserted ${result.insertedCount} documents into ${collection} collection.`);
  } finally {
    await client.close();
  }
};

const assetsFolderPath = path.join(__dirname, 'assets');

const coursesFilePath = path.join(assetsFolderPath, 'courses.json');
const coursesData = readJsonFile(coursesFilePath);
insertData('courses', coursesData);

const enrollmentsFilePath = path.join(assetsFolderPath, 'enrollments.json');
const enrollmentsData = readJsonFile(enrollmentsFilePath);
insertData('enrollments', enrollmentsData);

const usersFilePath = path.join(assetsFolderPath, 'users.json');
const usersData = readJsonFile(usersFilePath);
insertData('users', usersData);

console.log('Data migration completed.');
