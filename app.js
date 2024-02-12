const express = require('express');
require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/notfound');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app  = express();
const tasks = require('./router/tasks');
const connectDB = require('./db/connect');

app.use(express.static('./public'));
app.use(express.json());
    
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        const port = process.env.PORT || 3000;
        app.listen(port);
    }
    catch (error) {
        console.log(error);
    }
}

start();
