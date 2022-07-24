import React, { useRef } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const id_ref = useRef(null);
  const pw_ref = useRef(null);

  let username;
  let user_id;

  const onLogin = async () => {
    navigate('/main');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.login}>
        <h1 className={styles.title}>
          <p>
            💼면접<span>킹</span>
          </p>
        </h1>
        <div className={styles.loginWrapper}>
          <div className={styles.inputBox}>
            <input type="email" placeholder="아이디(이메일)" ref={id_ref} />
            <input type="password" placeholder="비밀번호" ref={pw_ref} />
          </div>
          <button className={styles.loginBtn} onClick={onLogin}>
            로그인
          </button>
          <button
            className={styles.signUpBtn}
            onClick={() => {
              navigate('/signUp');
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
