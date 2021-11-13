import bodyParser from "body-parser";
import express from "express";
import {SqliteHandler} from "./database/sqlite-handler";
import {getPlayers} from "./get-players";
import {getMatches} from "./get-matches";
import {getScoreboard} from "./get-scoreboard";
import {createMatch} from "./create-match";
import {createPlayer} from "./create-player";
import {DatabaseHandler} from "./database/database-handler";

const app = express();
app.use(bodyParser.json({}));

const sqliteHandler: DatabaseHandler = new SqliteHandler();

app.all("/*", (req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
   next();
});

app.get("/", (req, res) => {
   res.send("Coming soon");
});

app.get("/players", (req, res) => {
   getPlayers(req, res, sqliteHandler);
});

app.get("/matches", (req, res) => {
   getMatches(req, res, sqliteHandler);
});

app.get("/scoreboard", (req, res) => {
   getScoreboard(req, res, sqliteHandler);
});

app.post("/match", (req, res) => {
   createMatch(req, res, sqliteHandler);
});

app.post("/player", (req, res) => {
   createPlayer(req, res, sqliteHandler);
});

app.listen( 8080, () => {
   console.log("Example app listening at port 8080");
});