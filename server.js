const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const blogRoutes = require("./routes/blogRoutes");

// configuring .env file path
dotenv.config({path: "./config/config.env"});

// creating an express application
const app = express();

// connecting with database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(result => {
    console.log("Application successfully connected with database.");
})
.catch(err => {
    console.log(`Following error occured while connecting with database: ${err}`);
})

// application listening on assigned port
const PORT = process.env.PORT || 3102;
app.listen(PORT, () => {
    console.log(`Application is up and running on port: ${PORT}`);
})

// setting up view engine
app.set("view engine", "ejs");

// setting up views folder
app.set("views", process.env.VIEWS_FOLDER);

// use /public folder for static files
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use("/blogs", blogRoutes);

// home page
app.get("/", (req, res) => {
    res.render("index", {
        pageTitle: "Home Page"
    })
})

// 404 page
app.use((req, res) => {
    res.status(404).render("404", {
        pageTitle: "OOPS!! Page Not Found."
    })
})