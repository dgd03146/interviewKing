import React, { useEffect, useRef, useState } from 'react';
import styles from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../../redux/auth-slice';

const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isEmpty, setIsEmpty] = useState(false); // input 비워있으면 회원가입 button 클릭x

  // input Value state 회원가입 정보
  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    password: '',
    passwordCheck: ''
  });

  const [errorMessage, setErrorMessage] = useState({
    emailErrorMessage: '',
    usernameErrorMessage: '',
    passwordErrorMessage: '',
    passwordCheckErrorMessage: ''
  });

  const id_ref = useRef(null);
  const username_ref = useRef(null);
  const pw_ref = useRef(null);
  const pwCheck_ref = useRef(null);

  const { username, email, password, passwordCheck } = inputValue;

  // validation check
  const regexp = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/; // email 형식 정규표현식
  const validEmail = email.match(regexp);
  const validName = username.length >= 3; // 정규식으로 바꿀것
  const validPassword = password.length >= 6; // 정규식으로 바꿀것
  const validPasswordCheck = password === passwordCheck;

  useEffect(() => {
    if (
      email !== '' &&
      username !== '' &&
      password !== '' &&
      passwordCheck !== ''
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [email, username, password, passwordCheck]);

  const onChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    });
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    const user = {
      loginId: id_ref.current.value,
      pw: pw_ref.current.value,
      username: username_ref.current.value
    };

    dispatch(addUser(user));

    // navigate('/login');
  };

  return (
    <div className={styles.signUpPage}>
      <form className={styles.signUp} onSubmit={onSignUp}>
        <h1 className={styles.title}>
          <p>
            💼면접<span>킹</span>
          </p>
        </h1>
        <div className={styles.signUpWrapper}>
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="아이디(이메일)"
              ref={id_ref}
              name="email"
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="닉네임"
              ref={username_ref}
              name="username"
              onChange={onChange}
            />
            <input
              type="password"
              placeholder="비밀번호"
              ref={pw_ref}
              autoComplete="off"
              name="password"
              onChange={onChange}
            />
            <input
              type="password"
              autoComplete="off"
              placeholder="비밀번호 체크"
              ref={pwCheck_ref}
              name="passwordCheck"
              onChange={onChange}
            />
          </div>
          <button
            className={`${styles.signUpBtn} ${!isEmpty && styles.disable}`}
            type="submit"
            disabled={!isEmpty}
          >
            회원가입
          </button>
          <button
            type="button"
            className={styles.loginBtn}
            onClick={() => {
              navigate('/login');
            }}
          >
            <span>로그인</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
