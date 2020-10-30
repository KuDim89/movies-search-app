import React, {useEffect,  useState} from "react";
import {useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";
import styles from './Movies.module.scss'
import Search from "./Search/Search";
import Card from "./Card/Card";
import Loader from "../../components/Loader/Loader";
import {hideLoginPage, moviesDataDefault, searchMovies, setRandomMovie} from "../../redux/actions";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import {useAuth} from "../../hooks/use-auth";
import {useLoginPage} from "../../hooks/use-loginPage";
import {useMovies} from "./hooks/use-movies";


export default function Movies() {
  const dispatch = useDispatch();
  const isLogin = useLoginPage()
  const isMovies = useMovies()
  const authentication = useAuth()

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  useEffect(() => {
    if (isLogin === true) {
      dispatch(hideLoginPage())
    }

    if (isMovies.length === 0) {
      getMovies()
    }
  }, []);

  async function getMovies() {
    setLoading(true)
    try {
      await dispatch(moviesDataDefault());
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const handleRandomClick = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await dispatch(setRandomMovie())
      setLoading(false)
    } catch (error) {
      setError(error.message)
    }
  }

  async function handleSearchClick(string) {
    setLoading(true)
    const searchValue = string.toString().trim()
    try {
      await dispatch(searchMovies(searchValue));
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const closeModal = () => {
    setError(null)
  }

  return (
      authentication
      ? <>
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
                    : isMovies.map(item => (
                        <Card key={item.imdbID} cardData={item}/>
                    ))
                }
                {isError && <ErrorModal error={isError} closeModal={closeModal}/>}
              </div>
            </div>
          </>
      : <Redirect to="/" />
  )
}



