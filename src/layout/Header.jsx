import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Header.module.css';
import { authActions } from '../redux/auth-slice';

const Header = () => {
  const username = useSelector((state) => state.auth.user.username);

  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(authActions.logOut()); // isLoggedIn false
    localStorage.removeItem('TOKEN'); // locaStroage에서 삭제
  };

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
                  {username}
                  <span>님</span>
                </p>
              </Link>
            </div>
            <div className={styles.logOut} onClick={onLogOut}>
              <Link to={'/login'}>로그아웃</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
