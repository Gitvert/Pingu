import bodyParser from "body-parser";
import express from "express";
import request from "request";

import {Elo} from "./elo";
import {Player} from "./player";
import {DatabaseHandler} from "./database/database-handler";
import {Match} from "./match";

const config = require("./pingu-config.json");
const app = express();
app.use(bodyParser.json({}));

const databaseHandler: DatabaseHandler = new DatabaseHandler();

app.get("/", (req, res) => {
   res.send("Coming soon");
});

app.get("/players", (req, res) => {
   databaseHandler.fetchPlayers().then((records) => {
      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(records));
   }).catch(() => {
      res.sendStatus(500);
   });
});

app.get("/matches", (req, res) => {
   databaseHandler.fetchMatches().then((records) => {
      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(records));
   }).catch(() => {
      res.sendStatus(500);
   });
});

app.get("/scoreboard", (req, res) => {
   databaseHandler.fetchPlayers().then((playerRecords) => {
      databaseHandler.fetchMatches().then((matchRecords) => {
         const players = new Map(playerRecords.map((record) => [record.id, new Player(record.id, record.name)]));

         const matches: Match[] = matchRecords.map((record) => new Match(record.date, record.winner, record.loser));

         matches.forEach((match) => {
            Elo.updateEloRating(players.get(match.winner), players.get(match.loser));
         });

         const response = [...players.values()].map((player) => {
            return {
               id: player.id,
               name: player.name,
               rating: player.rating,
               wins: player.wins,
               losses: player.losses
            };
         });

         res.setHeader("Content-type", "application/json");
         res.send(JSON.stringify(response.sort((r1, r2) => r2.rating - r1.rating)));
      }).catch(() => {
         res.sendStatus(500);
      });
   }).catch(() => {
      res.sendStatus(500);
   });
});

app.post("/match", (req, res) => {
   const winnerId: number = req.body.winner;
   const loserId: number = req.body.loser;

   databaseHandler.recordMatch(new Match(new Date().toISOString(), winnerId, loserId)).then(() => {
      res.sendStatus(200);

      databaseHandler.fetchPlayerFromId(winnerId).then((winner) => {
         databaseHandler.fetchPlayerFromId(loserId).then((loser) => {
            request.post(config.slackUrl, {
               json: {
                  text: `${winner.name} won over ${loser.name}`
               }
            });
         });
      });
   }).catch((error) => {
      if (error.toString().includes("FOREIGN KEY constraint failed")) {
         res.sendStatus(400);
      } else {
         res.sendStatus(500);
      }
   });
});

app.post("/player/create", (req, res) => {
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

app.listen( 8080, () => {
   console.log("Example app listening at port 8080");
});