const mongoose = require('mongoose');

const main = async () => {
    try {
        await mongoose.connect('mongodb://localhost/email',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false, // Disable command buffering
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false, // Disable command buffering
            serverSelectionTimeoutMS: 30000, // Increased timeout duration

           });
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = main
