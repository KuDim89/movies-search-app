import React, {useEffect, useState} from "react";
import styles from './Movies.module.scss'
import Search from "../Search";
import Card from "../Card";
import {randomWord} from "../../utils/randomWord";
import {getMoviesArr} from "../../utils/getMoviesArr";
import Loader from "../Loader";
import Modal from "../Modal";

const objectErrorText = {
  MOVIE_NOT_FOUND : "Movie not found!",
  TOO_MANY_RESULTS : "Too many results.",
  INCORRECT_IMDB_ID : "Incorrect IMDb ID.",
  REQUEST_LIMIT_REACHED : "Request limit reached!"
}

const defaultMoviesArr = [
  {
    Title: "Wonder Woman",
    Year: "2017",
    imdbID: "tt0451279",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg"
  },
  {
    Title: "Pretty Woman",
    Year: "1990",
    imdbID: "tt0100405",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNjk2ODQzNDYxNV5BMl5BanBnXkFtZTgwMTcyNDg4NjE@._V1_SX300.jpg"
  },
  {
    Title: "Scent of a Woman",
    Year: "1992",
    imdbID: "tt0105323",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BZTM3ZjA3NTctZThkYy00ODYyLTk2ZjItZmE0MmZlMTk3YjQwXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
  },
  {
    Title: "The Woman in Black",
    Year: "2012",
    imdbID: "tt1596365",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjEwMzIxOTg3N15BMl5BanBnXkFtZTcwMjI4ODUzNw@@._V1_SX300.jpg"
  },
  {
    Title: "The Other Woman",
    Year: "2014",
    imdbID: "tt2203939",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTc0ODE4ODY1OF5BMl5BanBnXkFtZTgwMDA5NjkzMTE@._V1_SX300.jpg"
  },
  {
    Title: "Woman in Gold",
    Year: "2015",
    imdbID: "tt2404425",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTExMTUxNDQ5MjdeQTJeQWpwZ15BbWU4MDk4NTgxMzQx._V1_SX300.jpg"
  },
  {
    Title: "The Woman in Black 2: Angel of Death",
    Year: "2014",
    imdbID: "tt2339741",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTgxMjUyNTAxNF5BMl5BanBnXkFtZTgwNTk4MDUyMzE@._V1_SX300.jpg"
  },
  {
    Title: "The Woman",
    Year: "2011",
    imdbID: "tt1714208",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMmM3ZmFmNDctMDEwZS00ODhlLWE0OWQtZTljMGNiZjg2ZTFiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  },
  {
    Title: "A Fantastic Woman",
    Year: "2017",
    imdbID: "tt5639354",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNGJhNWM4ZjItYWRhYS00N2UzLTg3OWItOGEzOWFmMGQ1ZjlkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
  },
  {
    Title: "A Woman Under the Influence",
    Year: "1974",
    imdbID: "tt0072417",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BZDQwZmIzZjAtMmI1YS00NzEwLWFmYmEtMGFkYTk5NTllNDA0XkEyXkFqcGdeQXVyMTA2ODMzMDU@._V1_SX300.jpg"
  }
]

const Movies = () => {
    const initialMoviesData = JSON.parse(window.localStorage.getItem("Movies")) || [];
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState(initialMoviesData);
    const [error, setError] = useState('')
    const [errorText, setErrorText] = useState('')
    let count = 0; // 0

  useEffect(() => {
    window.localStorage.setItem("Movies", JSON.stringify(movies))
    if (movies.length === 0 && !error) {
      return randomMovieArr();
    }
    setMovies(movies);
    setLoading(false);
  }, [movies])

  function randomMovieArr()  {
    if(count < 10){
      count = count + 1
      randomWord().then(word => getMoviesArr(word).then(data => {
        if (data.Response === "True" && loading) {
          setMovies(data.Search)
          setLoading(false)
        } else {
          randomMovieArr();
        }
      }))
    } else {
      getMoviesArr("woman").then(data => {
        if (data.Response === "True") { // True
          setMovies(data.Search)
          setLoading(false)
        } else {
          setError(data.Error);
          defineErrorText(data.Error)
          setMovies(defaultMoviesArr)
          setLoading(false)
        }
      })
    }
  }

  const search = (string) => {
    const searchValue = string.toString().trim()
    getMoviesArr(searchValue).then(data => {
      if (data.Response === "True") {
        setMovies(data.Search)
        setLoading(false)
      } else {
        setError(data.Error)
        defineErrorText(data.Error)
        // setMovies([]);
      }
    })
  }

  const defineErrorText = (error) => {
    switch (error) {
      case objectErrorText.MOVIE_NOT_FOUND :
        setErrorText( "It looks like there aren't any great matches for your search. Change your keywords and try again.")
        break;
      case objectErrorText.TOO_MANY_RESULTS :
        setErrorText("Your word very short or it's only symbols. We find too many coincidences. Please enter more longer word without symbols.")
        break;
      case objectErrorText.INCORRECT_IMDB_ID :
        setErrorText("You are forgot enter a word in input. Try enter word again and feel happy.")
        break;
      case objectErrorText.REQUEST_LIMIT_REACHED :
        setErrorText("Please accept our apologies and visit us tomorrow.")
        break;
      default:
        setErrorText("We have problems. Please try again later.")
    }
  }

  const closeModal = () => {
    setError('')
  }

  return (
      <>
        <div className="row w-100">
          <div className="col-12">
            <Search search={search} error={setError}/>
          </div>
        </div>
        <div className={`${styles.cards_wrapper} ${styles.relative}`}>
          <div className="row w-100">
            { loading && !error
              ? <Loader />
              : movies.map(item => (
                    <Card key={item.imdbID} cardData={item} />
                ))
            }
            {error && <Modal text={errorText} error={error} closeModal={closeModal} />}
          </div>
        </div>
      </>
  )
}

export default Movies;