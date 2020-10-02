import React, {useEffect, useState} from "react";
import {Link, withRouter, useHistory} from "react-router-dom";
import styles from "./MovieInformation.module.scss"
import {getMoviesInfo} from "../../utils/omdbFunctions/getMovieInfo";
import Modal from "../../components/ErrorModal/ErrorModal";
import Loader from "../../components/Loader/Loader";
import InformationTable from "./InformationTable/InformationTable";
import Poster from "./Poster/Poster";

const MovieInformation = (props) => {
  const initialState = {
    loading: true,
    movieData: {},
    error: '',
  }

  const [movieInformationState, setMovieInformationState] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    getIdInfo()
  }, [])

  async function getIdInfo() {

    const id = props.match.params.id;
    try {
      const data = await getMoviesInfo(id);

      if (data.Response === "True") {
        const refactoredData = {
          title: data.Title,
          poster: data.Poster,
          plot: data.Plot,
          tables: [
            {
              title: 'General information',
              data: {
                year: data.Year,
                language: data.Language,
                released: data.Released,
                runtime: data.Runtime,
                genre: data.Genre
              }
            },
            {
              title: 'Working team',
              data: {
                country: data.Country,
                director: data.Director,
                writer: data.Actors,
              }
            },
            {
              title: 'Other information',
              data: {
                rated: data.Rated,
                awards: data.Awards,
                metaScore: data.Metascore,
                boxOffice: data.BoxOffice,
                production: data.Production,
                website: data.Website
              }
            },
            {
              title: 'The Open Movie Database',
              data: {
                imdbRating: data.imdbRating,
                imdbVotes: data.imdbVotes,
                imdbID: data.imdbID
              }
            }
          ]
        }
        const newState = {
          ...movieInformationState,
          movieData: refactoredData,
          loading: false
        }
        setMovieInformationState(newState)
      } else if (data.Response === "False") {
        throw new Error(data.Error)
      } else {
        throw new Error('Response undefined')
      }

    } catch (error) {
      const newState = {
        ...movieInformationState,
        error: error.message,
        loading: false,
      }
      setMovieInformationState(newState)
    }
  }

  const closeModal = () => {
    history.push("/movies")
    setMovieInformationState({
      ...movieInformationState,
      error: "",
      loading: true
    })
  }

  return (
      <>
        {movieInformationState.loading && !movieInformationState.error
            ? <Loader/>
            : Object.keys(movieInformationState.movieData).length !== 0 && (<div className="bg-dark rounded my-4 pr-3 pl-3">
          <div className="row justify-content-end">
            <div className="col-3 col-sm-2 col-lg-1">
              <Link to='/movies'>
                <button
                    className="btn btn-outline-secondary rounded-circle align-content-end py-2 px-3 mt-4"
                >&#10005;</button>
              </Link>
            </div>
            <div className="col-12">
              <h1
                  className={`text-center my-4 text-white ${styles.nowrap}`}
                  title={movieInformationState.movieData.title}
              >{movieInformationState.movieData.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-4">
              <Poster
                  poster={movieInformationState.movieData.poster}
                  title={movieInformationState.movieData.title}
              />
            </div>
            <div className="col-12 col-lg-8">
              <p className="text-white font-weight-light mb-5">{movieInformationState.movieData.plot === "N/A" ? "No information" : movieInformationState.movieData.plot}</p>
              {movieInformationState.movieData.tables.map((table, index) => {
                if (index === 0) {
                  return (
                      <InformationTable
                          key={index}
                          tableData={table}
                      />
                  )
                }
              })
              }
            </div>
          </div>
          <div className="row">
            {movieInformationState.movieData.tables.map((table, index) => {
              if (index !== 0) {
                return (
                    <div className="col-12 col-lg-4 mb-4" key={index}>
                      <InformationTable
                          key={index}
                          tableData={table}
                      />
                    </div>
                )
              }
            })
            }
          </div>
        </div>)}
        {movieInformationState.error && <Modal error={movieInformationState.error} closeModal={closeModal}/>}
      </>
  )
}

export default withRouter(MovieInformation);