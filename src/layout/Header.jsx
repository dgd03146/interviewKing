import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to={'/main'}>
            <p>
              💼면접<span>킹</span>
            </p>
          </Link>
        </div>
        <div className={styles.columnContainer}>
          <ul className={styles.category}>
            <li>
              <Link to={'/postAdd'}>글쓰기</Link>
            </li>
          </ul>
          <div className={styles.userContainer}>
            <div>
              <Link to={'/myPage'}>
                <p className={styles.username}>
                  유저네임이너무길<span>님</span>
                </p>
              </Link>
            </div>
            <div className={styles.logOut}>
              <Link to={'/login'}>로그아웃</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
