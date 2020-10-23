export const defineErrorText = (error) => {
  const objectErrorText = {
    MOVIE_NOT_FOUND: "Movie not found!",
    TOO_MANY_RESULTS: "Too many results.",
    INCORRECT_IMDB_ID: "Incorrect IMDb ID.",
    REQUEST_LIMIT_REACHED: "Request limit reached!"
  }

  switch (error) {
    case objectErrorText.MOVIE_NOT_FOUND :
      return "It looks like there aren't any great matches for your search. Change your keywords and try again."
    case objectErrorText.TOO_MANY_RESULTS :
      return "Your word very short or it's only symbols. We find too many coincidences. Please enter more longer word without symbols."
    case objectErrorText.INCORRECT_IMDB_ID :
      return "We got incorrect movie id. Please try again later."
    case objectErrorText.REQUEST_LIMIT_REACHED :
      return "Please accept our apologies and visit us tomorrow."
    default:
      return "We have problems. Please try again later."
  }
}