import React, {useState} from "react";
import styles from "./Search.module.scss"

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const resetInput = () => {
    setSearchValue('');
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    //props.search(searchValue);
    resetInput();
  }

  return (
      <form className={`form-inline mt-2 ${styles.formNowrap}`}>
        <input
            className={`form-control mr-2 ${styles.formWidth}`}
            type="search"
            placeholder="Enter movie name here..."
            onChange={e => setSearchValue(e.target.value)}
        />
        <button
            className="btn btn-outline-warning my-2 my-sm-0"
            type="submit"
            onClick={callSearchFunction}
        >Search</button>
      </form>
  )
}

export default Search;