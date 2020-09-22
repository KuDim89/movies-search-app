import React, {useContext, useEffect, useState} from "react";
import styles from './Movies.module.scss'
import Search from "../../components/Search/Search";
import Card from "./Card/Card";
import {randomWord} from "../../utils/randomWord";
import {getMoviesArr} from "../../utils/omdbFunctions/getMoviesArr";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/ErrorModal/ErrorModal";
import AppContext from "../../context";

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
  }
]

const Movies = () => {
  const initialState = {
    movies: JSON.parse(window.localStorage.getItem("movies")) || [],
    loading: true,
    error: ""
  }

  const {appData, setAppData} = useContext(AppContext)
  const [movieState, setMovieState] = useState(initialState);

  useEffect(() => {
    if (appData.loginPage === true) {
      const newAppData = {
        ...appData,
        loginPage: false
      }
      setAppData(newAppData)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("movies", JSON.stringify(movieState.movies));

    if (movieState.movies.length === 0 && !movieState.error) {
      getData();
    } else {
      setMovieState({
        ...movieState,
        movies: movieState.movies,
        loading: false
      })
    }
  }, [movieState.movies])

  async function search(string) {
    setMovieState({
      ...movieState,
      loading: true
    });
    const searchValue = string.toString().trim()
    const data = await getMoviesArr(searchValue);
      if (data.Response === "True") {
        setMovieState({
          ...movieState,
          movies: data.Search
        })
      } else {
        setMovieState({
          ...movieState,
          error: data.Error
        });
      }
  }

  async function getData() {
    const data = await randomMovieArr(0, 10);
    data.Response === "True"
        ? setMovieState({
          ...movieState,
          movies: data.Search,
          loading: false
        })
        : setMovieState({
          ...movieState,
          movies: defaultMoviesArr,
          error: data.Error,
          loading: false
        })
  }

  async function randomMovieArr(count, max) {
    if (count >= max) {
      return await getMoviesArr("boy")
    } else {
      const word = await randomWord();
      const data = await getMoviesArr(word);
      if (data.Response === "True" && movieState.loading) {
        return data
      } else {
        if(data.Response === "False" && data.Error === "Movie not found!"){ // <----- ?
          return await randomMovieArr(count + 1, max);
        } else {
          return data;
        }
      }
    }
  }

  const closeModal = () => {
    setMovieState({
      ...movieState,
      error: ""
    });
  }

  return (
      <>
        <div className="row w-100">
          <div className="col-12">
            <Search search={search} error={setMovieState}/>
          </div>
        </div>
        <div className={`${styles.cards_wrapper} ${styles.relative}`}>
          <div className="row w-100">
            {movieState.loading && !movieState.error
                ? <Loader/>
                : movieState.movies.map(item => (
                    <Card key={item.imdbID} cardData={item}/>
                ))
            }
            {movieState.error && <Modal error={movieState.error} closeModal={closeModal}/>}
          </div>
        </div>
      </>
  )
}

export default Movies;