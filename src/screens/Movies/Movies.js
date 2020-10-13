import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styles from './Movies.module.scss'
import Search from "./Search/Search";
import Card from "./Card/Card";
import Loader from "../../components/Loader/Loader";
import {hideLoginPage, moviesDataDefault, searchMovies, setRandomMovie} from "../../redux/actions";
import ErrorModal from "../../components/ErrorModal/ErrorModal";


const Movies = ({isLogin, movies, hideLoginPage, moviesDataDefault, searchMovies, setRandomMovie}) => {

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  useEffect(() => {
    if (isLogin === true) {
      hideLoginPage()
    }

    if (movies.length === 0) {
      getMovies()
    }
  }, []);

  async function getMovies() {
    setLoading(true)
    try {
      await moviesDataDefault();
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const handleRandomClick = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await setRandomMovie()
      setLoading(false)
    } catch (error) {

    }
  }

  async function handleSearchClick(string) {
    setLoading(true)
    const searchValue = string.toString().trim()
    try {
      await searchMovies(searchValue);
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const closeModal = () => {
    setError(null)
  }

  return (
      <>
        <div className="row w-100">
          <div className="col-12">
            <Search
                onSearchClick={handleSearchClick}
                onRandomClick = {handleRandomClick}
            />
          </div>
        </div>
        <div className={`${styles.cards_wrapper} ${styles.relative}`}>
          <div className="row w-100">
            {isLoading
                ? <Loader/>
                : movies.map(item => (
                    <Card key={item.imdbID} cardData={item}/>
                ))
            }
            {isError && <ErrorModal error={isError} closeModal={closeModal}/>}
          </div>
        </div>
      </>
  )
}

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
    movies: state.movies
  }
}

const mapDispatchToProps = {
  hideLoginPage,
  moviesDataDefault,
  setRandomMovie,
  searchMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);