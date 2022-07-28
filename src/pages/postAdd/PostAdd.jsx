import React, { useState, useEffect, useRef } from 'react';
import styles from './PostAdd.module.css';
import { newStacks } from '../../data';
import { useSelector, useDispatch } from 'react-redux';
import { layoutActions } from '../../redux/layout-slice';
import { useNavigate, useLocation } from 'react-router-dom';
import { postsActions } from '../../redux/posts-slice';
import axios from 'axios';

const PostAdd = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation(); // detailPost를 naivgation으로 전달받음
  const postId = state.postId;

  const [isEdit, setIsEdit] = useState(false);

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

  // FIXME:useEffect 로직을 하나의 useEffect에서만 작성해도 되지 않을까?
  // footer를 main page에서만 나타나게
  useEffect(() => {
    dispatch(layoutActions.notisMained());
  }, []);

  useEffect(() => {
    if (state) {
      // 기존의 post가 있다면
      setIsInputValue(state);
      setIsEdit(true);
    }
  }, []);

  useEffect(() => {
    // 게시물 유효성 체크
    if (title !== '' && content !== '' && stack !== '') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [title, content, stack]);

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
      companyname: companyname
    };

    // TODO:게시글 수정할때 등록. postId를 받아와야함.
    if (isEdit) {
      try {
        const response = await axios.put(
          `http://15.164.221.163:8080/api/${postId}`,
          post
        );
        alert('게시글이 수정되었습니다.'); // FIXME: 모달로 구현?
        navigate('/main');
      } catch (error) {
        console.log(error.response);
      }
      return;
    }

    // 게시글 작성
    try {
      const response = await axios.post(
        'http://15.164.221.163:8080/api/post',
        post
      );
      alert('게시글이 작성되었습니다.'); // FIXME:모달로 구현?
      navigate('/main');
    } catch (error) {
      console.log(error.response);
    }
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
                value={isInputValue.companyname}
              />
            </div>
          </div>
          <p>
            언어 선택 <span>(1개)</span>
          </p>
          <div className={styles.stack}>
            <select name="stack" onChange={onChange} value={isInputValue.stack}>
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
              value={isInputValue.title}
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
            value={isInputValue.content}
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
