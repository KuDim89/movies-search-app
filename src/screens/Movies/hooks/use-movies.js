import {useSelector} from "react-redux";

export const useMovies = () => {
  return useSelector(state => state.movies)
}