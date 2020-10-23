import React, {useState} from "react";
import styles from "./Search.module.scss"
import ButtonColored from "../../../components/ButtonColored/ButtonColored";


export default function Search({onSearchClick, onRandomClick}) {
  const [searchValue, setSearchValue] = useState('');

  const resetInput = () => {
    setSearchValue('');
  }

  const callSearchFunction = (e) => {
    if(searchValue){
      e.preventDefault();
      onSearchClick(searchValue);
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
        <ButtonColored
            additionalClasses={"btn-light my-2 mx-2"}
            type="submit"
            onClick={callSearchFunction}
            disabled={searchValue === null || searchValue.match(/^ *$/) !== null}
        >
          Search
        </ButtonColored>
        <ButtonColored
            additionalClasses={"btn-dark my-2"}
            type="submit"
            onClick={onRandomClick}
        >
          Random
        </ButtonColored>
      </form>
  )
}