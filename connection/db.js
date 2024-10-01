const mongoose = require('mongoose');

// Get the MongoDB connection string from environment variables
const connectionString = process.env.DATABASE;

// Connect to MongoDB
mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: 10000,  // Set a timeout for initial server selection
})
.then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
})
.catch((err) => {
    if (err.message && err.message.includes("querySrv ENOTFOUND")) {
        console.error("Connection error: Unable to resolve MongoDB Atlas host. Please check your connection string.");
    } else if (err.message && err.message.includes("cluster is paused")) {
        console.error("Connection error: The MongoDB Atlas cluster is paused. Please resume the cluster to allow connections.");
    } else {
        console.error("Connection error:", err);
    }
});
