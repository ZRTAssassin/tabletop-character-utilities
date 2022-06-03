const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();
const MongoClient = require("mongodb").MongoClient;

// const server = http.createServer((req, res) => {
//   const page = url.parse(req.url).pathname;
//   const params = querystring.parse(url.parse(req.url).query);
//   console.log(page);
//   if (page == "/") {
//     fs.readFile("index.html", function (err, data) {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(data);
//       res.end();
//     });
//   } else if (page == "/otherpage") {
//     fs.readFile("otherpage.html", function (err, data) {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(data);
//       res.end();
//     });
//   } else if (page == "/otherotherpage") {
//     fs.readFile("otherotherpage.html", function (err, data) {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(data);
//       res.end();
//     });
//   } else if (page == "/api") {
//     if ("student" in params) {
//       if (params["student"] == "leon") {
//         res.writeHead(200, { "Content-Type": "application/json" });
//         const objToJson = {
//           name: "leon",
//           status: "Boss Man",
//           currentOccupation: "Baller",
//         };
//         res.end(JSON.stringify(objToJson));
//       } //student = leon
//       else if (params["student"] != "leon") {
//         res.writeHead(200, { "Content-Type": "application/json" });
//         const objToJson = {
//           name: "unknown",
//           status: "unknown",
//           currentOccupation: "unknown",
//         };
//         res.end(JSON.stringify(objToJson));
//       } //student != leon
//     } //student if
//   } //else if
//   else if (page == "/css/style.css") {
//     fs.readFile("css/style.css", function (err, data) {
//       res.write(data);
//       res.end();
//     });
//   } else if (page == "/js/main.js") {
//     fs.readFile("js/main.js", function (err, data) {
//       res.writeHead(200, { "Content-Type": "text/javascript" });
//       res.write(data);
//       res.end();
//     });
//   } else if (page == "/js/liana.json") {
//     fs.readFile("js/liana.json", function (err, data) {
//       res.writeHead(200, { "Content-Type": "text/javascript" });
//       res.write(data);
//       res.end();
//     });
//   } else {
//     figlet("404!!", function (err, data) {
//       if (err) {
//         console.log("Something went wrong...");
//         console.dir(err);
//         return;
//       }
//       res.write(data);
//       res.end();
//     });
//   }
// });

// MongoClient.connect('mongodb+srv://dbuser:S1d08o7Onb940T4I@cluster0.hxhao.mongodb.net/?retryWrites=true&w=majority', (err, client) => {

//   console.log("connected to the database");
// });

MongoClient.connect(
  "mongodb+srv://dbuser:S1d08o7Onb940T4I@cluster0.hxhao.mongodb.net/?retryWrites=true&w=majority"
)
  .then((client) => {
    console.log("Connected to the database");
    const db = client.db("tabletop-character-traits");
    const traitsCollection = db.collection("traits");

    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static("public"));
    app.get("/", (req, res) => {
      traitsCollection
        .find()
        .toArray()
        .then((results) => {
          // console.log(results);
          res.render("index.ejs", { traits: results });
        })
        .catch((error) => {
          console.error(error);
        });

      // res.sendFile(__dirname + "/index.html")
    });

    app.get("/css/normalize.css", (req, res) => {
      res.sendFile(__dirname + "/css/normalize.css");
    });
    app.get("/css/style.css", (req, res) => {
      res.sendFile(__dirname + "/css/style.css");
    });
    app.get("/js/main.js", (req, res) => {
      res.sendFile(__dirname + "/js/main.js");
    });

    app.get("/js/liana.json", (req, res) => {
      res.sendFile(__dirname + "/js/liana.json");
    });

    app.get("/traits", (req, res) => {
      traitsCollection
        .find()
        .toArray()
        .then((results) => {
          res.json(results);
        });
    });

    app.post("/traits", (req, res) => {
      console.log("/traits getting a thing!");
      traitsCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => {
          console.error(error);
        });
    });
    app.put("/traits", (req, res) => {
      //console.log(req.body);
      traitsCollection
        .findOneAndUpdate(
          { name: "Test" },
          {
            $set: {
              name: req.body.name,
              description: req.body.description,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          console.log(result);
          res.json("Success");
        })
        .catch((error) => {
          console.error(error);
        });
    });
    app.delete("/traits", (req, res) => {
      traitsCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No Spellcasting trait to delete");
          }
          res.json("Deleted Spellcasting");
        })
        .catch((error) => {
          console.error(error);
        });
    });

    app.listen(8000, () => {
      console.log("listening on 8000");
    });
  })
  .catch((error) => console.log(error));

// fs.readFile('index.html', function (err, data) {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write(data);
//   res.end();
// });

// mongodb+srv://dbuser:<S1d08o7Onb940T4I>@cluster0.hxhao.mongodb.net/?retryWrites=true&w=majority
