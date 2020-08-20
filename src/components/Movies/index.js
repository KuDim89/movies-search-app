import React, {useEffect, useState} from "react";
import Search from "../Search";

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt8936646&apikey=7a651c56";

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then(jsonResponse => {
          setMovies(jsonResponse);
          setLoading(false);
        })
  },[])

  const search = searchValue => {


  }
  return (
      <Search />
  )
}

export default Movies;