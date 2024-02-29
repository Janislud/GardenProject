import React from 'react';
import style from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {ProductsCard} from "../ProductsCard/ProductsCard"
import { closeModal } from '../../slices/modalSlice';

const Modal = () => {

  const dispatch = useDispatch();
  const {modalActive, product } = useSelector((state) => state.modal)

    const handleCloseModal = () => {
      dispatch(closeModal())
    }

  if (!modalActive || !product || !product.discont_price) return null;
  

  return (
   <div className={`${style.modal} ${modalActive ? style.active : ''}`} onClick={handleCloseModal}>
      <div className={style.modal__content} onClick={(e) => e.stopPropagation()}>
        <ProductsCard product={product} />
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};
  


export default Modal;


// const Modal = ({active, setActive, children}) => {
//   return (
//     <div className={active ? `${style.modal} ${style.active}` : style.modal} onClick={() => setActive(false)}>
//       <div className={active ? `${style.modal__content} ${style.active__content}` : style.modal__content} onClick={e => e.stopPropagation() }></div>
//       {children}
//     </div>
//   )
// }

/* */

    // <div className={style.modal} onClick={() => dispatch(closeModal())}>
    //   <div className={style.modal__content} onClick={(e) => e.stopPropagation()}>
    //   {product && <ProductsCard product={product} />}
    //     <button onClick={() => dispatch(closeModal())}>Close</button>
    //   </div>
    // </div>