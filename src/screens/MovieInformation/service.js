import {getMoviesInfo} from "../../utils/omdbFunctions/getMovieInfo";

export async function getIdInfo(id) {
  try {
    const data = await getMoviesInfo(id);

    if (data.Response === "True") {
     return {
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
    } else if (data.Response === "False") {
      throw new Error(data.Error)
    } else {
      throw new Error('Response undefined')
    }
  } catch (error) {
    throw error
  }
}
