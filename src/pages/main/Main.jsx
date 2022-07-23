import styles from './Main.module.css';
import React from 'react';

const Main = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  return (
    <div className={styles.main}>
      <div className={styles.banner}>
        <div className={styles.bannerContainer}>
          <img
            className={styles.bannerImage}
            src={process.env.PUBLIC_URL + `/assets/banner6.png`}
            alt="bannerImage"
          />
        </div>
      </div>
      <div className={styles.category}>
        <h2>기술 스택</h2>
        <ul className={styles.stacks}>
          <li>All</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Vue</li>
          <li>Java</li>
          <li>Python</li>
          <li>Spring</li>
          <li>Node</li>
          <li>django</li>
        </ul>
      </div>
    </div>
  );
};

export default Main;
