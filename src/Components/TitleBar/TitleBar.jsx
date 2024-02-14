import { Link } from "react-router-dom";
import style from "./TitleBar.module.css";


export const TitleBar = ({ title, linkTo, buttonText}) => {
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

