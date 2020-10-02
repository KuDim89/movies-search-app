import React from "react";
import styles from "./Footer.module.scss";

const Footer = (props) => {
  return (
      <footer className={`page-footer font-small bg-dark footer-dark pt-4 ${styles.footer}`}>
        <div className="footer-copyright text-center py-3">{props.siteData.gitName}:&nbsp;
          <a target='_blank' href={props.siteData.gitLink}>
            Movies Search App 2020</a>
        </div>
      </footer>
  )
}

export default Footer;