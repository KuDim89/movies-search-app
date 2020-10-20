import React from "react";
import styles from "./Footer.module.scss";

export default function Footer({siteData}) {
  return (
      <footer className={`page-footer font-small bg-dark footer-dark pt-4 ${styles.footer}`}>
        <div className="footer-copyright text-center py-3">{siteData.gitName}:&nbsp;
          <a target='_blank' href={siteData.gitLink}>
            Movies Search App 2020</a>
        </div>
      </footer>
  )
}