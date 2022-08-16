import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <p>
            💼면접<span>킹</span>
          </p>
        </div>
        <div className={styles.columnContainer}>
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + `/assets/githubIcon.png`}
              alt="github"
            />
          </a>
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + `/assets/blogIcon.png`}
              alt="blog"
            />
          </a>
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + `/assets/youtubeIcon.png`}
              alt="youtube"
            />
          </a>
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + `/assets/notionIcon.png`}
              alt="notion"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
