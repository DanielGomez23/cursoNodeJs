import express from "express";
import crypto from "node:crypto";
import movies from "./movies.json" with { type: "json" };
import zod, { string } from "zod";

const app = express();
app.use(express.json())
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

//Todos los recursos que sean MOVIES se identifican como /movies
app.get("/movies", (req, res) => {
  const { genre } = req.query
  if (genre){
    const filteredMovies = movies.filter(
      movie => movie.genre.some(genr => genr.toLowerCase() === genre.toLowerCase())
      )
      return res.json(filteredMovies)
    }
  res.json(movies)
})
  app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" })
});

app.post("/movies", (req, res) =>{
  const movieSchema = zod.object({
    title: zod.string({
      invalid_type_error: "Movie title must be a string",
      required_error: "Movie title is required. Please."
    }),
    year: zod.number().int().min(1900).max(2024),
    director: zod.string(),
    duration: zod.number().int().positive(),
    rate: zod.nunmber().min(0).max(10),
    poster: zod.string().url({
      message: "Poster must be a valid URL"
    }).endsWith(".jpg"),
    genre: zod.array(
      zod.enum(["Action,", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Thriller", "Sci-Fi"]),
      {
        required_error: "Movie genre is required.",
        invalid_type_error: "Movie genre must be an arrat of enum Genre"
      }
    )
  })
    const {
    title, 
    year,
    director,
    duration,
    poster,
    genre,
    rate
    } = req.body

      
    const newMovie = {
      id: crypto.randomUUID,  //uuid v4
      title, 
      year,
      director,
      duration,
      poster,
      genre,
      rate: rate ?? 0
    }
  //No seria rest porque estamos guardandp el estado de la app en memoria  
    movies.push(newMovie)

    res.status(201).json(newMovie) //actualizar caché del cliente
})

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT https://localhost:${PORT}`);
});
