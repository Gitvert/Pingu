import bodyParser from "body-parser";
import express from "express";

import {Elo} from "./elo";
import {Player} from "./player";
import {DatabaseHandler} from "./database/database-handler";
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

app.get("/matches", (req, res) => {
   databaseHandler.fetchMatches().then((matches) => {
      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(matches));
   }).catch(() => {
      res.sendStatus(500);
   });
});

/*app.get("/scoreboard", (req, res) => {
   const p1: Player = new Player("Jesper", 1200);
   const p2: Player = new Player("Jonas", 1000);

   Elo.updateEloRating(p1, p2);

   res.send(p1.rating + " " + p2.rating);

   res.send("Coming soon");
});*/

app.post("/match", (req, res) => {
   databaseHandler.recordMatch(new Match(new Date().toISOString(), req.body.winner, req.body.loser)).then(() => {
      res.sendStatus(200);
   }).catch((error) => {
      if (error.toString().includes("FOREIGN KEY constraint failed")) {
         res.sendStatus(400);
      } else {
         res.sendStatus(500);
      }
   });
});

app.post("/users/create", (req, res) => {
   databaseHandler.createUser(req.body.name).then(() => {
      res.sendStatus(200);
   }).catch((error) => {
      if (error.toString().includes("UNIQUE constraint failed")) {
         res.sendStatus(409);
      } else {
         res.sendStatus(500);
      }
   });
});

// start the express server
app.listen( 8080, () => {
   console.log("Example app listening at port 8080");
});