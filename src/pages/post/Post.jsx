import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './Post.module.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useSelector, useDispatch } from 'react-redux';
import { layoutActions } from '../../redux/layout-slice';
import axios from 'axios';
import { getDetailPost } from '../../redux/posts-slice';
import InboxIcon from '@mui/icons-material/Inbox';
import { postApi } from '../../shared/api.js';

const Post = () => {
  const { postId } = useParams();

  const { state } = useLocation(); // from myPage
  const loginId = useSelector((state) => state.auth.user.loginId);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const detailPost = useSelector((state) => state.posts.detailPost);

  const [inputComment, setInputComment] = useState();
  const [targetComments, setTargetComments] = useState();
  const [commentId, setCommentId] = useState();

  const [comments, setComments] = useState([]);

  const commentRef = useRef();

  useEffect(() => {
    dispatch(getDetailPost(postId));
    dispatch(layoutActions.notisMained()); // footer를 main page에서만 나타나게 하기 위해서.
  }, []);

  useEffect(() => {
    setComments(detailPost.comments);
  }, [detailPost]);

  // 수정 버튼을 눌렀을때 input 태그 생성
  const [isCommentEdit, setIsCommentEdit] = useState(false);

  // FIXME:아이디와 같은 댓글들 찾기
  useEffect(() => {
    if (loginId && comments?.length >= 1) {
      const targetComments = comments?.filter((it) => it.loginId == loginId);
      setTargetComments(targetComments);
    }
  }, [comments]);

  // post 삭제
  const onDelete = async () => {
    console.log(postId);
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await postApi.postDelete(postId);
        alert('삭제되었습니다.');
        navigate('/main');
      } catch (error) {
        console.log(error.response);
        alert('삭제를 실패하였습니다.');
      }
    } else {
      alert('취소합니다.');
    }
  };

  const onChange = (e) => {
    setInputComment(e.target.value);
  };

  const onComment = async () => {
    console.log(postId, 'postId임');
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);
    let timeString = hours + ':' + minutes + ':' + seconds;
    const date = dateString + ' ' + timeString.slice(0, 5);

    const comment = {
      comment: inputComment,
      date: date
    };

    // 댓글 수정 등록
    if (isCommentEdit) {
      try {
        const response = await postApi.editComment(commentId, comment);
        dispatch(getDetailPost(postId)); // FIXME: 댓글 다시 불러오기위해
        setIsCommentEdit(false);
        return;
      } catch (error) {
        console.log(error.response);
      }
      return;
    }

    // 댓글 등록
    try {
      const response = await postApi.addComment(comment, postId);
      if (response.data) {
        alert('댓글이 작성되었습니다.');
        commentRef.current.value = '';
        dispatch(getDetailPost(postId)); // FIXME: 댓글 다시 불러오기위해
      }
      return;
    } catch (error) {
      console.log(error.response);
    }
  };

  const onEditComment = (it) => {
    const targetComment = targetComments.find(
      (el) => el.commentId == it.commentId
    );

    setCommentId(targetComment.commentId);

    setInputComment(targetComment.comment);
    setIsCommentEdit(true);
  };

  const onCancelComment = () => {
    setIsCommentEdit(false);
  };

  // 댓글 삭제
  const onDeleteComment = async (it) => {
    const targetComment = targetComments.find(
      (el) => el.commentId == it.commentId
    );

    setCommentId(targetComment.commentId);

    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response = await postApi.deleteComment(targetComment.commentId);

        if (response.data) {
          alert('댓글이 삭제되었습니다.');
          dispatch(getDetailPost(postId)); // FIXME: 댓글 다시 불러오기위해
        }
        return;
      } catch (error) {
        console.log(error.response);
        alert('댓글 삭제를 실패하였습니다.');
      }
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
              {detailPost.comments?.length}
            </p>
          </div>
          {(state || detailPost.loginId == loginId) && (
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
          {comments?.length < 1 ? (
            <div className={styles.noComments}>
              <InboxIcon />
              <p>댓글을 작성해주세요</p>
            </div>
          ) : (
            comments?.map((it) => {
              return (
                <div key={it.commentId} className={styles.comment}>
                  <div className={styles.commentTop}>
                    <p className={styles.commentNickname}>{it.username}</p>
                    <p className={styles.commentTime}>{it.date}</p>
                  </div>
                  <div>{it.comment}</div>
                  {isCommentEdit && commentId == it.commentId && (
                    <div>
                      <input
                        className={styles.editComment}
                        type="text"
                        value={inputComment || ''}
                        onChange={onChange}
                      />
                    </div>
                  )}
                  {it.loginId == loginId && (
                    <div className={styles.commentBtnBox}>
                      {isCommentEdit && commentId == it.commentId ? (
                        <button onClick={onCancelComment}>취소</button>
                      ) : (
                        <button
                          onClick={() => {
                            onEditComment(it);
                          }}
                        >
                          수정
                        </button>
                      )}
                      {isCommentEdit ? (
                        <button onClick={onComment}>등록</button>
                      ) : (
                        <button
                          onClick={() => {
                            onDeleteComment(it);
                          }}
                        >
                          삭제
                        </button>
                      )}
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
          name="comment"
          id=""
          cols="30"
          rows="1"
          ref={commentRef}
          onChange={onChange}
        />
        {/* input이 빈칸이 아닐때 등록 버튼 활성화 */}
        <div className={styles.buttonBox}>
          <button onClick={onComment}>등록</button>
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
