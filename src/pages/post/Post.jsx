import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import { comments, lists } from '../../data';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useSelector, useDispatch } from 'react-redux';
import { layoutActions } from '../../redux/layout-slice';

const Post = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();

  // footer를 main page에서만 나타나게
  useEffect(() => {
    dispatch(layoutActions.notisMained());
  }, []);

  // 나중에 useEffect에서 state로 바꿔줘야함
  const targetPost = lists.find((it) => it.postId == postId);

  let navigate = useNavigate();

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
          <p>
            <ThumbUpOffAltIcon />
            {targetPost.likes}
          </p>
          <p>
            <ChatBubbleOutlineIcon />
            {'25'}
          </p>
        </div>
      </div>
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
