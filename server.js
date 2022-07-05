require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { name } = require("ejs");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;
const uri = process.env.DB_STRING;
// let characterRepo = require("./repo/characterRepo");

MongoClient.connect(uri)
  .then((client) => {
    console.log("Connected to the database");
    const db = client.db("tabletop-character-traits");
    const traitsCollection = db.collection("traits");
    const characterDb = client.db("tabletop-characters");
    const characterCollection = characterDb.collection("characters");

    // const character = characterRepo.get(function(data){
    //   if (data){
    //     console.log(data);
    //   }
    // }, function(err){
    //     if (err){
    //       console.log(err);
    //     }
    // });

    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/public"));

    app.get("/", (req, res) => {
      traitsCollection
        .find()
        .sort({ name: 1 })
        .toArray()
        .then((results) => {
          // console.log(results);
          // console.log(results);
          // console.log(typeof results);
          res.render("index.ejs", { traits: results });
        })
        .catch((error) => {
          console.error(error);
        });

      // res.sendFile(__dirname + "/index.html");
    });
    app.get("/character", (req, res) => {
      characterCollection
        .find()
        .toArray()
        .then((results) => {
          // console.log(results);
          res.render("character.ejs", { character: results });
        });
    });
    app.get("/character/:name", (req, res) => {
      console.log(req.params);
      characterCollection
        .findOne({
          name: req.params.name,
        })
        .then((results) => res.json(results));
    });

    // app.get("/character", (req, res) => {
    //   characterRepo.get(
    //     function (data) {
    //       // console.log(typeof data);
    //       // console.log(data);
    //       res.render("character.ejs", { character: data });

    //       // res.json(data);
    //     },
    //     function (err) {
    //       next(err);
    //     }
    //   );
    // });

    // app.get("/upload"(req, res)=>{

    // })

    app.get("/traits", (req, res) => {
      traitsCollection
        .find()
        .toArray()
        .then((results) => {
          res.json(results);
        });
    });

    app.post("/traits/add", (req, res) => {
      const canAdd = true;
      console.log(req.body);
      //console.log("/traits getting a thing!");
      // req.body.name.trim(); don't know if this is gonna work, but it's worth trying.
      if (canAdd) {
        traitsCollection
          .insertOne({
            abilityName: req.body.abilityName,
            abilityDescription: req.body.abilityDescription,
            sourceBook: req.body.sourceBook,
            damageType: req.body.damageType,
          })
          .then((result) => {
            console.log(`${req.body.abilityName} added`);
            res.redirect("/");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // console.log(`${req.body} added`);
        res.redirect("/");
      }
    });

    app.put("/traits", (req, res) => {
      //console.log(req.body);
      traitsCollection
        .findOneAndUpdate(
          { name: "Test" },
          {
            $set: {
              abilityName: req.body.abilityName,
              abilityDescription: req.body.abilityDescription,
            },
          },
          {
            upsert: false,
          }
        )
        .then((result) => {
          // console.log(result);
          res.json("Success");
        })
        .catch((error) => {
          console.error(error);
        });
    });
    app.delete("/traits", (req, res) => {
      traitsCollection
        .deleteOne({ abilityName: req.body.abilityName })
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

    app.listen(process.env.PORT || PORT, () => {
      console.log("listening on 8000");
    });
  })
  .catch((error) => console.log(error));
