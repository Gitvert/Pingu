import bodyParser from "body-parser";
import express from "express";
import request from "request";

import {Elo} from "./elo";
import {Player} from "./player";
import {DatabaseHandler} from "./database/database-handler";
import {Match} from "./match";
import {MatchResponse, PlayerResponse, ScoreboardResponse} from "./responses";

const config = require("./pingu-config.json");
const app = express();
app.use(bodyParser.json({}));

const databaseHandler: DatabaseHandler = new DatabaseHandler();

app.get("/", (req, res) => {
   res.send("Coming soon");
});

app.get("/players", (req, res) => {
   databaseHandler.fetchPlayers().then((records) => {
      const responseBody: PlayerResponse[] = records.map((r) =>  new PlayerResponse(r.id, r.name));

      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(responseBody));
   }).catch(() => {
      res.sendStatus(500);
   });
});

app.get("/matches", (req, res) => {
   databaseHandler.fetchMatches().then((records) => {
      const responseBody: MatchResponse[] = records.map((r) => new MatchResponse(r.date, r.winner, r.loser, r.winner_score, r.loser_score));

      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(responseBody));
   }).catch(() => {
      res.sendStatus(500);
   });
});

app.get("/scoreboard", (req, res) => {
   databaseHandler.fetchPlayers().then((playerRecords) => {
      databaseHandler.fetchMatches().then((matchRecords) => {
         const players = new Map(playerRecords.map((r) => [r.id, new Player(r.id, r.name)]));

         const matches: Match[] = matchRecords.map((r) => new Match(r.date, r.winner, r.loser, r.winner_score, r.loser_score));

         matches.forEach((match) => {
            Elo.updateEloRating(players.get(match.winner), players.get(match.loser));
         });

         const responseBody: ScoreboardResponse[] = [...players.values()].map((p) => {
            return new ScoreboardResponse(p.id, p.name, p.rating, p.wins, p.losses);
         }).sort((r1, r2) => r2.rating - r1.rating);

         res.setHeader("Content-type", "application/json");
         res.send(JSON.stringify(responseBody));
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
   const winnerScore: number = req.body.winnerScore;
   const loserScore: number = req.body.loserScore;

   databaseHandler.recordMatch(new Match(new Date().toISOString(), winnerId, loserId, winnerScore, loserScore)).then(() => {
      res.sendStatus(200);

      databaseHandler.fetchPlayerFromId(winnerId).then((winner) => {
         databaseHandler.fetchPlayerFromId(loserId).then((loser) => {
            request.post(config.slackUrl, {
               json: {
                  text: `${winner.name} won over ${loser.name} with ${winnerScore} - ${loserScore}`
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