import { Link } from "react-router-dom";
import style from "../Line/Line.module.css";
export const Line = ({ title, linkTo, buttonText}) => {
return (
      <div className={style.titleTextWrapper}>
        <h2 className={style.titleDescription}>
          {title}
        </h2>

        <div className={style.line}></div>

        <button className={style.titleBtn}>
          <Link className={style.titleBtnDescription} to={linkTo}>
            {buttonText}
          </Link>
        </button>
      </div>
)
}