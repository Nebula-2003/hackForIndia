const mongoose = require("mongoose");

exports.mongo_connection = () => {
    mongoose.set("debug", true);
    try {
        mongoose.connect(
            "mongodb+srv://tejus:tejus@cluster0.93zv4wh.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
            function (err, db) {
                if (err) {
                    console.log("MongoDB Database Connection Error", err);
                } else {
                    console.log("MongoDB Connection Done!!");
                }
            }
        );
    } catch (e) {
        console.log("🚀 ~ file: mongoDb.js:23 ~ e:", e);
        console.log("MongoDB Connection Error");
    }
};
