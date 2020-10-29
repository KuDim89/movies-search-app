import React, {useEffect, useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import styles from "./MovieInformation.module.scss"
import Modal from "../../components/ErrorModal/ErrorModal";
import Loader from "../../components/Loader/Loader";
import InformationTable from "./InformationTable/InformationTable";
import Poster from "./Poster/Poster";
import {useAuth} from "../../hooks/use-auth";
import {getIdInfo} from "./service";

export default function MovieInformation({...props}) {

  const [isMovieData, setMovieData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null)

  const history = useHistory();
  const authentication = useAuth();
  const id = props.match.params.id;

  useEffect( () => {
    setLoading(true)
    try {
      getIdInfo(id).then(response => {
        setMovieData(response)
        setLoading(false)
      })
    } catch (error){
      setError(error.message)
      setLoading(false)
    }
  }, [])


  const closeModal = () => {
    history.push("/movies")
    setError(null);
  }

  return (
      authentication
          ? <>
            {isLoading && !isError
                ? <Loader/>
                : Object.keys(isMovieData).length !== 0 && (<div className="bg-dark rounded my-4 pr-3 pl-3">
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
                      title={isMovieData.title}
                  >{isMovieData.title}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-lg-4">
                  <Poster
                      poster={isMovieData.poster}
                      title={isMovieData.title}
                  />
                </div>
                <div className="col-12 col-lg-8">
                  <p className="text-white font-weight-light mb-5">{isMovieData.plot === "N/A" ? "No information" : isMovieData.plot}</p>
                  {isMovieData.tables.map((table, index) => {
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
                {isMovieData.tables.map((table, index) => {
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
            {isError && <Modal error={isError} closeModal={closeModal}/>}
          </>
      : <Redirect to="/" />
  )
}
