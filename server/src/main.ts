import bodyParser from "body-parser";
import express from "express";
// import {SqliteHandler} from "./database/sqlite-handler";
import {getPlayers} from "./get-players";
import {getMatches} from "./get-matches";
import {getScoreboard} from "./get-scoreboard";
import {createMatch} from "./create-match";
import {createPlayer} from "./create-player";
import {DatabaseHandler} from "./database/database-handler";
import {DynamodbHandler} from "./database/dynamodb-handler";

export enum Environment {
   LOCAL = 0,
   PROD = 1,
}

const app = express();
app.use(bodyParser.json({}));

const environment: Environment = getEnvironment();
const databaseHandler: DatabaseHandler = new DynamodbHandler();
// const databaseHandler: DatabaseHandler = new SqliteHandler();

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
   createMatch(req, res, databaseHandler, environment);
});

app.post("/player", (req, res) => {
   createPlayer(req, res, databaseHandler);
});

app.listen( 8080, () => {
   console.log("App listening at port 8080");
});

function getEnvironment(): Environment {
   if (process.argv.slice(2)[0] == "dev") {
      return Environment.LOCAL;
   } else {
      return Environment.PROD;
   }
}

/*function getDatabaseHandler(): DatabaseHandler {
   if (process.argv.slice(2)[0] == "dev") {
      console.log("Running with sqlite")
      return new SqliteHandler();
   } else {
      console.log("Running with DynamoDB")
      return new DynamodbHandler();
   }
}*/