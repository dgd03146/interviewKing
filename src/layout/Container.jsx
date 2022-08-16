import React from 'react';
import { useState } from 'react';
import styles from './Container.module.css';

const Container = (props) => {
  const [isMain, setIsMain] = useState(true);
  return (
    <div className={`${styles.container} ${isMain && styles.main}`}>
      {props.children}
    </div>
  );
};

export default Container;
