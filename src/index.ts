import bodyParser from "body-parser";
import express from "express";

import {Elo} from "./elo";
import {Player} from "./player";
import {DatabaseHandler} from "./database-handler";
import {Match} from "./match";

const app = express();
app.use(bodyParser.json({}));

const databaseHandler: DatabaseHandler = new DatabaseHandler();

app.get("/", (req, res) => {
   res.send("Coming soon");
});

app.get("/users", (req, res) => {

   databaseHandler.fetchUsers();

   res.send();
});

app.post("/match", (req, res) => {

   console.log(req.body);

   const match: Match = new Match("2020-02-20 19:43:20", 1, 2);

   databaseHandler.recordMatch(match);

   /*const p1: Player = new Player("Jesper", 1200);
   const p2: Player = new Player("Jonas", 1000);

   Elo.updateEloRating(p1, p2);

   res.send(p1.rating + " " + p2.rating);*/
   res.sendStatus(200);
});

app.post("/users/create", (req, res) => {
   databaseHandler.createUser("lol");

   res.sendStatus(200);
});

// start the express server
app.listen( 8080, () => {
   console.log("Example app listening at port 8080");
});