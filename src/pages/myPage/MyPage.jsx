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

  useEffect(() => {
    dispatch(postsActions.isEdit());
  }, []);

  // 자기 게시글인지 알아야 하니까? useEffect로 불러오기

  return (
    <div className={styles.myPage}>
      <div className={styles.profileBox}>
        <h1>{'유저네임이너무길'}</h1>
        <p>
          게시물 <span>{'43'}</span>
        </p>
      </div>
      {/* FIXME:lists가 아닌 myPosts */}
      <ul className={styles.lists}>
        {lists.map((it, index) => {
          return (
            <li
              key={index}
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
                <span>
                  <ThumbUpOffAltIcon />
                  {it.likes}
                </span>
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
