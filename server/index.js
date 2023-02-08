require('dotenv').config();
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const router = require('./src/routes/index');
const errorHandler = require('./src/middleware/ErrorHandling');

const PORT = process.env.PORT || 5000;
const app = express();
const jsonParser = express.json();

app.use(cors()); // отключает CORS
app.use(jsonParser);

// подключение к базе MongoDB
const dbName = process.env.DB_NAME || 'usersdb'; // название DB
const url = process.env.DB_URL || 'mongodb://localhost:27017'; // URL DB
const clientPromise = new MongoClient(url, { useUnifiedTopology: true, maxPoolSize: 10 });
app.use(async (req, res, next) => {
    try {
        const client = await clientPromise.connect();
        req.db = client.db(dbName);
        next();
    } catch (err) {
        console.log(`Ошибка подключения базы MongoDB: `, err);
        next(err);
    }
})

app.use('/api', router);

app.use(errorHandler) // обработка ошибок //* самый последний!!!

app.listen(PORT, () => { console.log(`SERVER RUN on PORT: ${PORT}`) })