import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import imgGreenForm from "../../assets/images/imgGreenForm/imgGreenForm.svg";
import { addNewUser } from "../../slices/usersSlice";
import style from "./DataUserForm.module.css";

export const DataUserForm = () => {
  const dispatch = useDispatch();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: {} });

  const handleAddUser = (data) => {
    const newUser = {
      ...data,
      id: uuidv4(),
    };

    dispatch(addNewUser(newUser));
    setIsFormSubmitted(true);
    reset();
  };

  return (
    <>
      <div className={style.greenDiv}>
        <h2 className={style.h2TitleForm}>5% off on the first order</h2>
        <form className={style.divForm} onSubmit={handleSubmit(handleAddUser)}>
          <div className={style.imgWrapper}>
            <img
              className={style.formHands}
              src={imgGreenForm}
              alt="five hands picture"
            />
          </div>
          <div className={style.divInputs}>
            {isFormSubmitted && (
              <p className={style.pSubmittedRegistration}>
                {isSubmitSuccessful
                  ? "Thank you for your registration!"
                  : "Try please your registration one more time. Thank you!"}
              </p>
            )}
            {!isFormSubmitted && (
              <>
                <p className={style.formErrorMessage}>
                  {errors.firstName?.message}
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
                      value: 10,
                      message: "Your name should have less than 10 Letters",
                    },
                  })}
                />
                <p className={style.formErrorMessage}>
                  {errors.phone?.message}
                </p>
                <input
                  className={style.allThreeInputs}
                  type="tel"
                  placeholder="Phone number"
                  id="phone"
                  {...register("phone", {
                    required: true,
                    pattern: {
                      value:
                        /(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)([\d]+))/g,
                      message: "It is not a german number",
                    },
                  })}
                />
                <p className={style.formErrorMessage}>
                  {errors.email?.message}
                </p>
                <input
                  className={style.allThreeInputs}
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
                <button type="submit" className={style.whiteButton}>
                  Get a discount
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
