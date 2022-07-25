import React, { useState, useEffect } from 'react';
import styles from './PostAdd.module.css';
import { newStacks } from '../../data';
import { useSelector, useDispatch } from 'react-redux';
import { layoutActions } from '../../redux/layout-slice';
import { useNavigate } from 'react-router-dom';

const PostAdd = () => {
  const [Selected, setSelected] = useState('');

  const isMain = useSelector((state) => state.layout.isMain);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // footer를 main page에서만 나타나게
  useEffect(() => {
    dispatch(layoutActions.notisMained());
  }, [isMain, dispatch]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <div className={styles.postAdd}>
        <div className={styles.titleBox}>
          <div className={styles.company}>
            <p>회사명</p>
            <div>
              <input className={styles.companyInput} type="text" />
            </div>
          </div>
          <p>
            언어 선택 <span>(1개)</span>
          </p>
          <div className={styles.stack}>
            <select name="" id="" onChange={handleSelect} value={Selected}>
              {newStacks.map((it, index) => (
                <option value={it} key={index}>
                  {it}
                </option>
              ))}
            </select>
            {Selected && <div className={styles.selectedStack}>{Selected}</div>}
          </div>
          <div className={styles.title}>
            <input type="text" placeholder="제목을 입력해주세요" />
          </div>
        </div>
        <div className={styles.contentBox}>
          <textarea
            className={styles.content}
            name=""
            id=""
            cols="30"
            rows="12"
          />
          <div className={styles.buttonBox}>
            <button>등록</button>
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
