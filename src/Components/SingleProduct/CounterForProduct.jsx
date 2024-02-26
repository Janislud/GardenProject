import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  reset,
  selectCount,
} from "../../slices/counterSlice";
import style from "./singleProduct.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState( typeof initialQuantity === "number" ? initialQuantity : 0  );
  const count = useSelector(selectCount);

  const handleIncrement = () => {
    //setQuantity(quantity + 1);
    dispatch(increment());
  };

  const handleDecrement = () => {
    if (count > 0) {
      //setQuantity(quantity - 1);
      dispatch(decrement());
    }
  };

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className={style.divCounter}>
      <button className={style.minusButton} onClick={handleDecrement}>
        -
      </button>
      <button className={style.countButton}>{count}</button>
      <button className={style.plusButton} onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default Counter;
