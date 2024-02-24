import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import style from "./MainBanner.module.css";

export const MainBanner = () => {
  return (
    <section className={style.backgroundImage}>
      <div className={style.descriptionWrapper}>
        <h1 className={style.discountDescription}>
          Amazing Discounts on Garden Products!
        </h1>
        <Link to="/sales">
          <Button buttonClass="primary" text="Check out" />
        </Link>
      </div>
    </section>
  );
};
