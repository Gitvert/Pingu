import { Greeter } from "./greeter";
import express from "express";
const app = express();

app.get('/', function (req, res) {
   res.send(Greeter('Jesper'));
})

// start the express server
const server = app.listen( 8080, () => { 
   console.log("Example app listening at port 8080");
} );