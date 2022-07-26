import React, { useState, useEffect, useRef } from 'react';
import styles from './PostAdd.module.css';
import { newStacks } from '../../data';
import { useSelector, useDispatch } from 'react-redux';
import { layoutActions } from '../../redux/layout-slice';
import { useNavigate } from 'react-router-dom';
import { postsActions } from '../../redux/posts-slice';
import axios from 'axios';

const PostAdd = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEmpty, setIsEmpty] = useState(false); // input 비워있으면 등록 버튼 x

  const titleRef = useRef('');
  const contentRef = useRef('');
  const stackRef = useRef('');
  const companynameRef = useRef('');

  const [isInputValue, setIsInputValue] = useState({
    title: '',
    content: '',
    stack: '',
    companyname: ''
  });

  const { title, content, stack, companyname } = isInputValue;

  // footer를 main page에서만 나타나게
  useEffect(() => {
    dispatch(layoutActions.notisMained());
  }, []);

  useEffect(() => {
    // 게시물 유효성 체크
    if (title !== '' && content !== '' && stack !== '' && companyname !== '') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [title, content, stack, companyname]);

  const onChange = (e) => {
    setIsInputValue({
      ...isInputValue,
      [e.target.name]: e.target.value
    });
  };

  const onAdd = async () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);
    let timeString = hours + ':' + minutes + ':' + seconds;
    const date = dateString + ' ' + timeString;

    // server에 데이터 추가
    const post = {
      title: title,
      content: content,
      stack: stack,
      date: date,
      views: 0,
      companyname: companyname
    };

    // axios 에러 처리 // mock api
    const response = await axios
      .post('http://localhost:5001/posts', post)
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <div className={styles.postAdd}>
        <div className={styles.titleBox}>
          <div className={styles.company}>
            <p>회사명</p>
            <div>
              <input
                className={styles.companyInput}
                type="text"
                name="companyname"
                onChange={onChange}
              />
            </div>
          </div>
          <p>
            언어 선택 <span>(1개)</span>
          </p>
          <div className={styles.stack}>
            <select
              name="stack"
              id=""
              onChange={onChange}
              value={isInputValue.stack}
            >
              {newStacks.map((it, index) => (
                <option value={it} key={index}>
                  {it}
                </option>
              ))}
            </select>
            {isInputValue.stack && (
              <div className={styles.selectedStack}>{isInputValue.stack}</div>
            )}
          </div>
          <div className={styles.title}>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              name="title"
              onChange={onChange}
            />
          </div>
        </div>
        <div className={styles.contentBox}>
          <textarea
            className={styles.content}
            name="content"
            cols="30"
            rows="12"
            onChange={onChange}
          />
          <div className={styles.buttonBox}>
            <button
              disabled={!isEmpty}
              className={`${!isEmpty && styles.disable}`}
              onClick={onAdd}
            >
              등록
            </button>
          </div>
        </div>
      </div>
      <button
        className={styles.backBtn}
        onClick={() => {
          navigate(-1);
        }}
      >
        {'<'} 뒤로
      </button>
    </div>
  );
};

export default PostAdd;
