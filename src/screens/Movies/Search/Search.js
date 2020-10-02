import React, {useState} from "react";
import styles from "./Search.module.scss"
import ButtonColored from "../../../components/ButtonColored/ButtonColored";
import {getMoviesArr} from "../../../utils/omdbFunctions/getMoviesArr";
import {randomWord} from "../../../utils/randomWord";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');

  async function callRandomData(e) {
    e.preventDefault();
    props.state.setMovieState({
      ...props.state.movieState,
      loading: true
    })
    try {
      const data = await randomMovieArr(0, 10);
      if (data.Response === "True") {
        props.state.setMovieState({
          ...props.state.movieState,
          movies: data.Search,
          loading: false
        })
      } else {
        throw new Error(data.Error)
      }
    } catch (error) {
      props.state.setMovieState({
        ...props.state.movieState,
        error: error.message,
        loading: false
      })
    }
  }

  async function randomMovieArr(count, max) {
    if (count >= max) {
      return await getMoviesArr("boy")
    } else {
      try {
        const word = await randomWord();
        const data = await getMoviesArr(word);

        if (data.Response === "True") {
          return data
        } else if (data.Response === "False" && data.Error === "Movie not found!") {
            return await randomMovieArr(count + 1, max);
        } else {
            throw new Error(data.Error);
          }
      } catch (error) {
        throw error;
      }
    }
  }

  const resetInput = () => {
    setSearchValue('');
  }

  const callSearchFunction = (e) => {
    if(searchValue){
      e.preventDefault();
      props.search(searchValue);
      resetInput();
    }
  }

  return (
      <form className={`form-inline mt-2 ${styles.formNowrap}`}>
        <input
            className={`form-control mr-2 ${styles.formWidth}`}
            type="search"
            autoComplete="off"
            placeholder="Enter movie name here..."
            value={searchValue}
            onChange={e => {
              let value = e.target.value;
              value = value.replace(/[^A-Za-z0-9(),-_., ]+/, '')
              setSearchValue(value)
            }}
        />
        <ButtonColored
            additionalClasses={"btn-light my-2 mx-2"}
            type="submit"
            onClick={callSearchFunction}
            disabled={searchValue === null || searchValue.match(/^ *$/) !== null}
        >
          Search
        </ButtonColored>
        <ButtonColored
            additionalClasses={"btn-dark my-2"}
            type="submit"
            onClick={e => {callRandomData(e)}}
        >
          Random
        </ButtonColored>
      </form>
  )
}

export default Search;