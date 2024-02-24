import React from "react";
import styles from './Button.module.css';


const Button = ({buttonClass, text, type, onClick}) => {
const customStyle = `${styles.button} ${styles[buttonClass]}`;
    return (
      <button type={type} onClick={onClick} className={customStyle}>{text}</button>
    );
  };
  
  export { Button };

