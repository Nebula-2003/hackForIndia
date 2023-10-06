const mongoose = require("mongoose");

exports.mongo_connection = () => {
    mongoose.set("debug", true);
    try {
        mongoose.connect(
            "mongodb://127.0.0.1:27017/hackforindia",
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
        console.log("MongoDB Connection Error");
    }
};
