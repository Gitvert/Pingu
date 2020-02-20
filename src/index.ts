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

app.get("/players", (req, res) => {

   databaseHandler.fetchPlayers().then((players) => {
      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(players));
   }).catch(() => {
      res.sendStatus(500);
   });
});

app.post("/match", (req, res) => {
   const match: Match = new Match("2020-02-20 19:43:20", 1, 2);

   databaseHandler.recordMatch(match).then(() => {
      res.sendStatus(200);
   }).catch(() => {
      res.sendStatus(500);
   });

   /*const p1: Player = new Player("Jesper", 1200);
   const p2: Player = new Player("Jonas", 1000);

   Elo.updateEloRating(p1, p2);

   res.send(p1.rating + " " + p2.rating);*/
});

app.post("/users/create", (req, res) => {
   databaseHandler.createUser("lol").then(() => {
      res.sendStatus(200);
   }).catch(() => {
      res.sendStatus(500);
   });
});

// start the express server
app.listen( 8080, () => {
   console.log("Example app listening at port 8080");
});