const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
var cors = require("cors");

const indexRouter = require("./routes/index");
const { mongo_connection } = require("./helper/mongoDb");

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

indexRouter.initialize(app);
mongo_connection();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //next(createError(404));
    const error = new Error("NOT_FOUND");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    /*res.json({
    error: true,
    message: error.message,
  });*/
    //console.log("85 ",error);
    return res.status(400).json({ success: false, error: error.message });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
