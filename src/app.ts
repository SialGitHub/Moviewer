import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import Movie from "../models/MovieSchema";
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const app = express();

const mongoDB = mongoose.connect(process.env.mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});
mongoDB
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("err", err);
    });

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

// @Create one movie
app.post('/movie', async (req, res) => {
    const movie = new Movie();
    movie.id = uuidv4();
    movie.film = req.body.film;
    movie.genre = req.body.genre;
    movie.lead_studio = req.body.lead_studio;
    movie.year = req.body.year;
    await movie.save();
    res.send(movie);
})

// @Get all movies
 app.get('/movies', async (req,res) => {
    const movies = await Movie.find();
    res.send(movies);
});

// @Get all movies by selected year
app.get('/movies/year/:year', async (req,res) => {
    const movie = await Movie.find({
            year: +req.params.year
    });
    if (movie){
        res.json(movie);
    } else {
        res.status(404).send({message: "Movie by year not found"})
    }
});

// @Get all movies by selected genre
app.get('/movies/genre/:genre', async  ( req, res) => {
    const movie = await Movie.find({
            genre: req.params.genre
    });
    if (movie){
        res.json(movie);
    } else {
        res.status(404).send({message: "Movie by genre not found"})
    }
})

function parseQueryData(data: any){
    if(!data) return [false, {}]
    const schemasTypesMovie:any = {
        "year": "number",
        "genre": "string"
    }
    const result:any = {};
    for(const i in data){
        if(data[i]){
            if(schemasTypesMovie[i] === "number") result[i] = +data[i]
            else if(schemasTypesMovie[i] === "string") result[i] = data[i]
        }
    }

    return Object.keys(result).length ? [true, result] : [false, {}]
}

app.get('/movies/filter', async (req,res) => {
    try {

        const [status, data] = parseQueryData(req.query)
        if(JSON.parse(status)){
            const movie = await Movie.find({
                ...data
            });
            if (movie){
                res.json(movie);
            } else {
                res.status(404).send({message: "Movie by year not found"})
            }
        } else {
            res.status(403).send({message: "Query params is required"})
        }

    } catch (e) {
        res.status(500).send({message: e})
    }
});



export {app};

