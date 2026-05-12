const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to ${mongoose.connection.name}`);
});

mongoose.connection.on('error', (error) => {
    console.log(`Mongo connection error: ${error}`);
});