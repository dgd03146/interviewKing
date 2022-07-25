import styles from './Main.module.css';
import React, { useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { lists, stacks } from '../../data';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
            {stacks.map((it, index) => (
              <div key={index} className={styles.item}>
                {it}
              </div>
            ))}
          </Slider>
        </div>
        <ul className={styles.lists}>
          {lists.map((it, index) => {
            return (
              <li
                key={index}
                className={styles.list}
                onClick={() => {
                  navigate('/post/' + it.postId);
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
        <button className={styles.moreBtn}>더 많은 게시물 보기</button>
      </div>
    </div>
  );
};

export default Main;
