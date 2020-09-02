import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import styles from "./MovieInformation.module.scss"
import {getMoviesInfo} from "../../utils/getMovieInfo";
import defaultPoster from "../../assets/poster.jpg"
import Modal from "../Modal";
import Loader from "../Loader";

const MovieInformation = () => {

  const [loading, setLoading] = useState(true);
  const [moviesInfo, setMoviesInfo] = useState({});
  const [error, setError] = useState("");

  const errorText = "We have problems, try re-login please!!!";
  const history = useHistory();

  useEffect(() => {
    const id = history.location.pathname.split(":").pop()
    getMoviesInfo(id).then(data => {
      if(data === undefined) {
        return setError("Responce undifined")
      }
      if (data.Response === "True" && loading) {
        setMoviesInfo(data)
        setLoading(false)
      } else {
        setError(data.Error)
      }
    })
  },[])

  const closeModal = () => {
    setError("");
  }

  const toMovie = () => {
    history.push("/movies")
  }

  return (
      <>
        {loading && !error
            ? <Loader />
            : Object.keys(moviesInfo).length !== 0 && (<div className="bg-dark rounded my-4 pr-3 pl-3">
          <div className="row justify-content-end">
            <div className="col-3 col-sm-2 col-lg-1">
              <button
                  className="btn btn-outline-secondary rounded-circle align-content-end py-2 px-3 mt-4"
                  onClick={toMovie}
              >&#10005;</button>
            </div>
            <div className="col-12">
              <h1
                  className={`text-center my-4 text-white ${styles.nowrap}`}
                  title={moviesInfo.Title}
              >&#10032; {moviesInfo.Title} &#10032;</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-4">
              <div className={styles.img_wrapper}>
                <img className="mb-5" src={moviesInfo.Poster === "N/A" ? defaultPoster : moviesInfo.Poster} alt={moviesInfo.Title}/>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <p className="text-white font-weight-light mb-5">{moviesInfo.Plot === "N/A" ? "No information" : moviesInfo.Plot}</p>
              <span className="text-white">General information</span>
              <hr className={`${styles.line} mb-4`}/>
              <div className="row">
                <div className="col-12 mb-4">
                  <table className="table table-borderless table-dark">
                    <tbody>
                    <tr>
                      <th scope="row">Year</th>
                      <td>{moviesInfo.Year === "N/A" ? "No information" : moviesInfo.Year}</td>
                    </tr>
                    <tr>
                      <th scope="row">Language</th>
                      <td>{moviesInfo.Language === "None" || moviesInfo.Language === "N/A" ? "No information" : moviesInfo.Language}</td>
                    </tr>
                    <tr>
                      <th scope="row">Released</th>
                      <td>{moviesInfo.Released === "N/A" ? "No information" : moviesInfo.Released}</td>
                    </tr>
                    <tr>
                      <th scope="row">Runtime</th>
                      <td>{moviesInfo.Runtime === "N/A" ? "No information" : moviesInfo.Runtime}</td>
                    </tr>
                    <tr>
                      <th scope="row">Genre</th>
                      <td>{moviesInfo.Genre === "N/A" ? "No information" : moviesInfo.Genre}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 mb-4">
              <span className="text-white">Working team</span>
              <hr className={`${styles.line} mb-4`}/>
              <table className="table table-borderless table-dark">
                <tbody>
                <tr>
                  <th scope="row">Country</th>
                  <td>{moviesInfo.Country === "N/A" ? "No information" : moviesInfo.Country}</td>
                </tr>
                <tr>
                  <th scope="row">Director</th>
                  <td>{moviesInfo.Director === "N/A" ? "No information" : moviesInfo.Director}</td>
                </tr>
                <tr>
                  <th scope="row">Writer</th>
                  <td>{moviesInfo.Writer === "N/A" ? "No information" : moviesInfo.Writer}</td>
                </tr>
                <tr>
                  <th scope="row">Actors</th>
                  <td>{moviesInfo.Actors === "N/A" ? "No information" : moviesInfo.Actors}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <span className="text-white">Other information</span>
              <hr className={`${styles.line} mb-4`}/>
              <table className="table table-borderless table-dark">
                <tbody>
                <tr>
                  <th scope="row">Rated</th>
                  <td>{moviesInfo.Rated === "N/A" || moviesInfo.Rated === "R" || moviesInfo.Rated === "Not Rated" ? "No information" : moviesInfo.Rated}</td>
                </tr>
                <tr>
                  <th scope="row">Awards</th>
                  <td>{moviesInfo.Awards === "N/A" ? "No information" : moviesInfo.Awards}</td>
                </tr>
                <tr>
                  <th scope="row">Metascore</th>
                  <td>{moviesInfo.Metascore === "N/A" ? "No information" : moviesInfo.Metascore}</td>
                </tr>
                <tr>
                  <th scope="row">Box Office</th>
                  <td>{moviesInfo.BoxOffice === "N/A" ? "No information" : moviesInfo.BoxOffice}</td>
                </tr>
                <tr>
                  <th scope="row">Production</th>
                  <td>{moviesInfo.Production === "N/A" ? "No information" : moviesInfo.Production}</td>
                </tr>
                <tr>
                  <th scope="row">Website</th>
                  <td>{moviesInfo.Website === "N/A" ? "No information" : moviesInfo.Website}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <span className="text-white">The Open Movie Database</span>
              <hr className={`${styles.line} mb-4`}/>
              <table className="table table-borderless table-dark">
                <tbody>
                <tr>
                  <th scope="row">Rating</th>
                  <td>{moviesInfo.imdbRating === "N/A" ? "No information" : moviesInfo.imdbRating}</td>
                </tr>
                <tr>
                  <th scope="row">Votes</th>
                  <td>{moviesInfo.imdbVotes === "N/A" ? "No information" : moviesInfo.imdbVotes}</td>
                </tr>
                <tr>
                  <th scope="row">ID</th>
                  <td>{moviesInfo.imdbID === "N/A" ? "No information" : moviesInfo.imdbID}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>)}
        {error && <Modal text={errorText} error={error} closeModal={closeModal} />}
      </>
  )
}

export default MovieInformation;