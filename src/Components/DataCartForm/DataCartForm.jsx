import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import ModalCart from "./../ModalCart/ModalCart";
import style from "./DataCartForm.module.css";

export const DataCartForm = () => {
  const totalCount = useSelector((state) => state.cart.totalCount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const theme = useSelector((state) => state.theme.theme);
  const [open, setOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = () => {
    setIsFormSubmitted(true);
    // Вы можете добавить здесь логику для отправки данных формы, если это необходимо
    // Например, вызов функции для отправки данных на сервер
    // Затем можно вызвать handleOpen() для открытия модального окна
    handleOpen();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  return (
    <div className={`${style.divFormWrapper} ${theme === "light" ? style.dark : style.light}`}>
      <div>
        <h2 className={style.order}>Order details</h2>
        <p className={style.itemCounter}>{totalQuantity} items</p>
        <div className={style.totalPrice}>
          <p className={style.total}>Total</p>
          <p className={style.price}>${parseFloat(totalCount.toFixed(2))}</p>
        </div>
      </div>
      <form className={style.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        {!isFormSubmitted && (
          <>
            <p className={style.formErrorMessage}>
              {errors.firstName && errors.firstName.message}
            </p>
            <input
              className={style.allThreeInputs}
              type="text"
              placeholder="Name"
              id="name"
              {...register("firstName", {
                required: "Please fill the field",
                minLength: {
                  value: 4,
                  message: "Your name should have more than 4 Letters",
                },
                maxLength: {
                  value: 20,
                  message: "Your name should have less than 10 Letters",
                },
              })}
            />
            <p className={style.formErrorMessage}>
              {errors.phone && errors.phone.message}
            </p>
            <input
              className={style.allThreeInputs}
              type="tel"
              placeholder="Phone number"
              id="phone"
              {...register("phone", {
                required: true,
                pattern: {
                  value: /(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)([\d]+))/g,
                  message: "It is not a german number",
                },
              })}
            />
            <p className={style.formErrorMessage}>
              {errors.email?.message}
            </p>
            <input
              className={`${style.allThreeInputs} ${style.lastInput}`}
              type="email"
              placeholder="Email"
              id="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "It is not a right email",
                },
              })}
            />
            <Button buttonClass={"primary"} text={"Order"} type="submit" />
          </>
        )}
        <ModalCart open={open} handleClose={handleClose} />
      </form>
    </div>
  );
};
