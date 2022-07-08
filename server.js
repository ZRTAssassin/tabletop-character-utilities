require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;
const bcrypt = require("bcrypt");
const uri = process.env.DB_STRING;
// let characterRepo = require("./repo/characterRepo");

MongoClient.connect(uri)
  .then((client) => {
    console.log("Connected to the database");
    const db = client.db("tabletop-character-traits");
    const traitsCollection = db.collection("traits");
    const characterDb = client.db("tabletop-characters");
    const characterCollection = characterDb.collection("characters");

    const users = [];

    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/public"));

    app.get("/users", (req, res) => {
      res.json(users);
    });

    // app.post("/users", async (req, res) => {
    //   try {
    //     hashedPassword = await bcrypt.hash(req.body.password, 10);
    //     const user = { name: req.body.name, password: hashedPassword };
    //     users.push(user);
    //     res.status(201).send();
    //   } catch (error) {
    //     res.status(500).send();
    //   }
    // });
    // app.post("/users/login", async (req, res) => {
    //   const user = users.find((user) => (user.name = req.body.name));
    //   if (user == null) {
    //     return res.status(400).send("Cannot find user");
    //   }
    //   try {
    //     if (await bcrypt.compare(req.body.password, user.password)) {
    //       console.log(await bcrypt.compare(req.body.password, user.password));
    //       res.send("Success");
    //     } else {
    //       res.send("Not Allowed");
    //     }
    //   } catch {
    //     res.status(500).send();
    //   }
    // });

    app.get("/", (req, res) => {
      res.render("index.ejs", { name: "Ryan" });
    });
    app.get("/login", (req, res) => {
      res.render("login.ejs");
    });

    app.get("/register", (req, res) => {
      res.render("register.ejs");
    });

    app.post("/register", async (req, res) => {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
        })
        res.redirect('/')
      } catch {
        res.redirect('/register')
      }
      console.log(users);
    });

    app.get("/abilities", (req, res) => {
      traitsCollection
        .find()
        .sort({ name: 1 })
        .toArray()
        .then((results) => {
          // console.log(results);
          // console.log(results);
          // console.log(typeof results);
          res.render("abilities.ejs", { traits: results });
        })
        .catch((error) => {
          console.error(error);
        });
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
