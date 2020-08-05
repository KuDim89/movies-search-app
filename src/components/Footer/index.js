import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
      <footer className="page-footer font-small bg-dark footer-dark pt-4">
        <div className="footer-copyright text-center py-3">More details here:&nbsp;
          <a target='_blank' href="https://github.com/KuDim89/movies-search-app">
            Movies Search App 2020</a>
        </div>
      </footer>
  )
}

export default Footer;