import React, { useEffect } from 'react';
import styles from './MyPage.module.css';
import { lists } from '../../data';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postsActions } from '../../redux/posts-slice';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const MyPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const isEdit = useSelector((state) => state.posts.isEdit);
  const myPosts = useSelector((state) => state.posts.myPosts);
  const username = useSelector((state) => state.auth.user.username);

  useEffect(() => {
    dispatch(postsActions.isEdit()); // 수정 중으로 변경
  }, []);

  return (
    <div className={styles.myPage}>
      <div className={styles.profileBox}>
        <h1>{username}</h1>
        <p>
          게시물 <span>{myPosts.length}</span>
        </p>
      </div>
      {/* FIXME:lists가 아닌 myPosts */}
      <ul className={styles.lists}>
        {myPosts.map((it) => {
          return (
            <li
              key={it.postId}
              className={styles.list}
              onClick={() => {
                navigate('/post/' + it.postId, { state: isEdit });
              }}
            >
              <div className={styles.leftBox}>
                <span className={styles.stack}>{it.stack}</span>
                <span>{it.title}</span>
              </div>
              <div className={styles.rightBox}>
                {/* 좋아요 <span>
                  <ThumbUpOffAltIcon />
                  {it.likes}
                </span> */}
                {it.date}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyPage;
