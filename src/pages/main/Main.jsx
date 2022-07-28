import styles from './Main.module.css';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { layoutActions } from '../../redux/layout-slice';
import { stacks } from '../../data';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getCategoryPosts, getPostsMain } from '../../redux/posts-slice';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

var settings = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4
};

const Main = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(layoutActions.isMained()); // main에서 footer 보이게
    // FIXME: ✅ dispatch(getPostsMain()); // main에 posts 받아온다.
  }, []);

  // FIXME: 카테고리 요청할때마다 API 요청을 해서 받아온다? useEffect로 처리해야하나?
  const onGetPosts = (stack) => {
    dispatch(getCategoryPosts(stack));
  };

  return (
    <div className={styles.main}>
      <div className={styles.banner}>
        <div className={styles.bannerContainer}>
          <img
            className={styles.bannerImage}
            src={process.env.PUBLIC_URL + `/assets/banner6.png`}
            alt="bannerImage"
          />
        </div>
      </div>
      <div className={styles.category}>
        <h2>기술 스택</h2>
        <div className={styles.items}>
          <Slider {...settings}>
            {stacks.map((stack, index) => (
              <div
                key={index}
                className={styles.item}
                onClick={() => {
                  onGetPosts(stack);
                }}
              >
                {stack}
              </div>
            ))}
          </Slider>
        </div>
        <ul className={styles.lists}>
          {posts.map((it, index) => {
            return (
              <li
                key={index}
                className={styles.list}
                onClick={() => {
                  navigate('/post/' + it.postId); // 상세 보기 page
                }}
              >
                <div className={styles.leftBox}>
                  <span className={styles.stack}>{it.stack}</span>
                  <span className={styles.title}>{it.title}</span>
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
        <button className={styles.moreBtn}>더 많은 게시물 보기</button>
      </div>
    </div>
  );
};

export default Main;
