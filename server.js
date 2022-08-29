const express = require("express");
const app = express();
const connectDB = require("./config/database");
const homeRoutes = require("./routes/home");
const traitRoutes = require("./routes/traits");
const authRoutes = require("./routes/auth");
const methodOverride = require("method-override");

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method override
app.use(
  methodOverride(function (request, response) {
    if (
      request.body &&
      typeof request.body == "object" &&
      "_method" in request.body
    ) {
      let method = request.body._method;
      delete request.body._method;
      return method;
    }
  })
);

// Routes
app.use("/", homeRoutes);
app.use("/traits", traitRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
