import { Link } from "react-router-dom";
import style from "./TitleBar.module.css";
import { useSelector } from "react-redux";

export const TitleBar = ({ title, linkTo, buttonText}) => {
  const theme = useSelector((state => state.theme.theme))

return (
  <div className={`${style.titleTextWrapper} ${theme === 'light' ? style.dark : style.light}`}>
    <h2 className={`${style.titleDescription} ${theme === 'light' ? style.dark : style.light}`}>
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

