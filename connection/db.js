const mongoose = require('mongoose');

// Get the MongoDB connection string from environment variables
const connectionString = process.env.DATABASE;

// Configure the Mongoose connection
mongoose.connect(connectionString, {
    useNewUrlParser: true,        // Use new URL string parser
    useUnifiedTopology: true,     // Use the new unified topology engine
    serverSelectionTimeoutMS: 10000,  // Set a timeout for initial server selection
})
.then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
})
.catch((err) => {
    console.error("Connection error:", err);
});
