const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const testRoutes = require("./routes/test");
const traitRoutes = require("./routes/traits");
const methodOverride = require("method-override");

require("dotenv").config({ path: "./config/.env" });

// Passport Config
require("./config/passport")(passport);

//Connect to Database
connectDB();

//Set up EJS for views
app.set("view engine", "ejs");

//Static folder
app.use(express.static("public"));

//Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//logging
app.use(logger("dev"));

//use forms for put/delete
app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// // Method override
// app.use(
//   methodOverride(function (request, response) {
//     if (
//       request.body &&
//       typeof request.body == "object" &&
//       "_method" in request.body
//     ) {
//       let method = request.body._method;
//       delete request.body._method;
//       return method;
//     }
//   })
// );

// Routes
app.use("/", mainRoutes);
app.use("/test", testRoutes);
app.use("/traits", traitRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
