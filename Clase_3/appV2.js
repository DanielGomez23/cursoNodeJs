import express from "express";
import crypto from "node:crypto";
import movies from "./movies.json" with { type: "json" };
import {validateMovie, validatePartialMovie} from "./movies.js"
import { error } from "node:console";

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
 
const result = validateMovie(req.body)
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message)})
        }

//En base de datos
    const newMovie = {
      id: crypto.randomUUID(),  //uuid v4
       ...result.data
    }
  //No seria rest porque estamos guardandp el estado de la app en memoria  
    movies.push(newMovie)

    res.status(201).json(newMovie) //actualizar caché del cliente
})
 

app.patch("/movies/:id", (req, res) => {
    const result = validatePartialMovie(req.body)
    
    if (!result.success){
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
         return res.status(404).json({message: "Movie not found"})
    }
    
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})
const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT https://localhost:${PORT}`);
});
