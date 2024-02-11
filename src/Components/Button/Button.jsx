import React from "react";
import styles from './Button.module.css' 


const Button = ({buttonClass, text, type}) => {
const customStyle = `${styles.button} ${styles[buttonClass]}`;
    return (
      <button type={type} className={customStyle}>{text}</button>
    );
  };
  
  export { Button };  