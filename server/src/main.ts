import bodyParser from "body-parser";
import express from "express";
import {DatabaseHandler} from "./database/database-handler";
import {getPlayers} from "./get-players";
import {getMatches} from "./get-matches";
import {getScoreboard} from "./get-scoreboard";
import {createMatch} from "./create-match";
import {createPlayer} from "./create-player";

const app = express();
app.use(bodyParser.json({}));

const databaseHandler: DatabaseHandler = new DatabaseHandler();

app.all("/*", (req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
   next();
});

app.get("/", (req, res) => {
   res.send("Coming soon");
});

app.get("/players", (req, res) => {
   getPlayers(req, res, databaseHandler);
});

app.get("/matches", (req, res) => {
   getMatches(req, res, databaseHandler);
});

app.get("/scoreboard", (req, res) => {
   getScoreboard(req, res, databaseHandler);
});

app.post("/match", (req, res) => {
   createMatch(req, res, databaseHandler);
});

app.post("/player", (req, res) => {
   createPlayer(req, res, databaseHandler);
});

app.listen( 8080, () => {
   console.log("Example app listening at port 8080");
});