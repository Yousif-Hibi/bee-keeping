import mongoose from 'mongoose';
 

const uri = "mongodb+srv://beekeeping:beekeeping@cluster0.gwotm8g.mongodb.net/?retryWrites=true&w=majority";

// Connect to the MongoDB server
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to MongoDB");

        // Check the connection status by running a simple query
        const db = mongoose.connection.db;
        db.collection('users').find({}).toArray(function (err, result) {
            if (err) {
                console.log("Error running query:", err);
            } else {
                console.log("Query result:", result);
            }

            // Close the connection when finished
            mongoose.disconnect();
        });
    })
    .catch(err => {
        console.log("Error connecting to MongoDB:", err);
    });
