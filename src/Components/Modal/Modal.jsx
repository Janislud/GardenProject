import React from 'react';
import style from './Modal.module.css';

const Modal = ({active, setActive, children}) => {
  return (
    <div className={active ? `${style.modal} ${style.active}` : style.modal} onClick={() => setActive(false)}>
      <div className={active ? `${style.modal__content} ${style.active__content}` : style.modal__content} onClick={e => e.stopPropagation() }></div>
      {children}
    </div>
  )
}
 
;


export default Modal;
