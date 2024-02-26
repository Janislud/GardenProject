import { useState } from "react";
import style from "./singleProduct.module.css";

const Counter = ({ onCountChange }) => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onCountChange(newQuantity); // Передаем новое значение в родительский компонент
  };

  const decrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onCountChange(newQuantity); // Передаем новое значение в родительский компонент
    }
  };

  return (
    <div className={style.divCounter}>
      <button className={style.minusButton} onClick={decrease}>-</button>
      <button className={style.countButton}>{quantity}</button>
      <button className={style.plusButton} onClick={increase}>+</button>
    </div>
  );
};

export default Counter;
