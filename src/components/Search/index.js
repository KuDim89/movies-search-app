import React, {useState} from "react";
import styles from "./Search.module.scss"

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');

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
        <button
            className="btn btn-outline-warning my-2 my-sm-0"
            type="submit"
            onClick={callSearchFunction}
            disabled={searchValue === null || searchValue.match(/^ *$/) !== null}
        >Search
        </button>
      </form>
  )
}

export default Search;