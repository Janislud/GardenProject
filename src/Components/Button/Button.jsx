import React from "react";
import styles from './Button.module.css' 


const Button = ({buttonClass, text, type}) => {
  const handleClick =(event) => {
    event.preventDefault()
  }
const customStyle = `${styles.button} ${styles[buttonClass]}`;
    return (
      <button onClick={handleClick} type={type} className={customStyle}>{text}</button>
    );
  };
  
  export { Button };  