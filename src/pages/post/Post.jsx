import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './Post.module.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useSelector, useDispatch } from 'react-redux';
import { layoutActions } from '../../redux/layout-slice';
import axios from 'axios';
import { getDetailPost } from '../../redux/posts-slice';
import InboxIcon from '@mui/icons-material/Inbox';

const Post = () => {
  const { postId } = useParams();

  const { state } = useLocation(); // from myPage
  const loginId = useSelector((state) => state.auth.user.loginId);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const detailPost = useSelector((state) => state.posts.detailPost);
  const comments = detailPost.comments;

  useEffect(() => {
    // FIXME: ✅ dispatch(getDetailPost(postId)); // detail 페이지
    dispatch(layoutActions.notisMained()); // footer를 main page에서만 나타나게 하기 위해서.
  }, []);

  // FIXME: front에서 targetPost 찾는 로직
  // const [targetPost, setTargetPost] = useState({}); // 어떤 post인지 확인
  // useEffect(() => {
  //   if (posts.length >= 1) {
  //     const post = posts.find((it) => it.postId == postId);
  //     setTargetPost(post);
  //   }
  // }, [posts]);

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
          <h1>{detailPost.title}</h1>
          <div className={styles.info}>
            <h3>{detailPost.stack}</h3>
            <p className={styles.companyname}>{detailPost.companyname}</p>
          </div>
          <p className={styles.date}>{detailPost.date}</p>
        </div>
        <div className={styles.textBox}>
          <p>{detailPost.content}</p>
        </div>
        <div className={styles.postInfo}>
          <div>
            {/* <p>
              <ThumbUpOffAltIcon />
              {detailPost.likes}
            </p> */}
            <p>
              <ChatBubbleOutlineIcon />
              {detailPost.comments.length}
            </p>
          </div>
          {state && (
            <div className={styles.btnBox}>
              <button
                className={styles.editBtn}
                onClick={() => {
                  navigate('/postAdd', { state: detailPost });
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
          {comments.length === 0 ? (
            <div className={styles.noComments}>
              <InboxIcon />
              <p>댓글을 작성해주세요</p>
            </div>
          ) : (
            comments.map((it) => {
              return (
                <div key={it.loginId} className={styles.comment}>
                  <div className={styles.commentTop}>
                    <p className={styles.commentNickname}>{it.username}</p>
                    <p className={styles.commentTime}>{it.date}</p>
                  </div>
                  <div>{it.comment}</div>
                  {it.loginId == loginId && (
                    <div className={styles.commentBtnBox}>
                      <button>수정</button>
                      <button>삭제</button>
                    </div>
                  )}
                </div>
              );
            })
          )}
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
