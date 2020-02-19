import {Elo} from "./elo";
import express from "express";
import {Player} from "./player";
import {DatabaseHandler} from "./database-handler";
const app = express();

app.get('/', function (req, res) {
   const p1: Player = new Player("Jesper", 1200);
   const p2: Player = new Player("Jonas", 1000);

   Elo.updateEloRating(p1, p2)

   res.send(p1.rating + " " + p2.rating);
});

// start the express server
app.listen( 8080, () => {
   console.log("Example app listening at port 8080");

   const databaseHandler: DatabaseHandler = new DatabaseHandler();
});