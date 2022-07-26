import React, { useRef } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postUser } from '../../../redux/auth-slice';

const Login = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const id_ref = useRef(null);
  const pw_ref = useRef(null);

  const onLogin = async () => {
    const user = {
      id: id_ref.current.value,
      pw: pw_ref.current.value
    };

    console.log(user);

    dispatch(postUser(user));
    // navigate('/main');
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.login}>
        <h1 className={styles.title}>
          <p>
            💼면접<span>킹</span>
          </p>
        </h1>
        <div className={styles.loginWrapper}>
          <div className={styles.inputBox}>
            <input type="email" placeholder="아이디(이메일)" ref={id_ref} />
            <input
              type="password"
              autoComplete="off"
              placeholder="비밀번호"
              ref={pw_ref}
            />
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
            <span>회원가입</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
