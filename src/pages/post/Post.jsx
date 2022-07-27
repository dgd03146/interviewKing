import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './Post.module.css';
import { comments, lists } from '../../data';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useSelector, useDispatch } from 'react-redux';
import { layoutActions } from '../../redux/layout-slice';
import axios from 'axios';

const Post = () => {
  const { postId } = useParams();

  const { state } = useLocation();

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);

  const [targetPost, setTargetPost] = useState({});

  useEffect(() => {
    dispatch(layoutActions.notisMained()); // footer를 main page에서만 나타나게
  }, []);

  useEffect(() => {
    if (posts.length >= 1) {
      const post = posts.find((it) => it.postId == postId);

      setTargetPost(post);
    }
  }, [posts]);

  const onDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(
          `http://15.164.221.163:8080/api/postId`
        );
        alert('삭제되었습니다.');
      } catch (error) {
        console.log(error.response);
        alert('삭제를 실패하였습니다.');
      }
    } else {
      alert('취소합니다.');
    }
  };

  return (
    <div className={styles.postPage}>
      <div className={styles.post}>
        <div className={styles.titleBox}>
          <h1>{targetPost.title}</h1>
          <h3>{targetPost.stack}</h3>
          <p>{targetPost.date}</p>
        </div>
        <div className={styles.textBox}>
          <p>{targetPost.content}</p>
        </div>
        <div className={styles.postInfo}>
          <div>
            <p>
              <ThumbUpOffAltIcon />
              {targetPost.likes}
            </p>
            <p>
              <ChatBubbleOutlineIcon />
              {'25'}
            </p>
          </div>
          {state && (
            <div className={styles.btnBox}>
              <button
                onClick={() => {
                  navigate('/postAdd', { state: targetPost });
                }}
              >
                수정
              </button>
              <button onClick={onDelete}>삭제</button>
            </div>
          )}
        </div>
      </div>
      {/* comments */}
      <div className={styles.commentBox}>
        <div className={styles.comments}>
          {comments.map((it) => {
            return (
              <div key={it.postId} className={styles.comment}>
                <div className={styles.commentTop}>
                  <p className={styles.commentNickname}>{it.nickname}</p>
                  <p className={styles.commentTime}>{it.time}</p>
                </div>
                <div>{it.content}</div>
              </div>
            );
          })}
        </div>
        <textarea
          className={styles.commentArea}
          placeholder="댓글을 입력해주세요"
          name=""
          id=""
          cols="30"
          rows="1"
        />
        {/* input이 빈칸이 아닐때 등록 버튼 활성화 */}
        <div className={styles.buttonBox}>
          <button>등록</button>
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

export default Post;
