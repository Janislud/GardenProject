import { Link } from "react-router-dom";
import fourGreen from "../../assets/images/ErrorMedia/fourGreen.svg";
import kaktus from "../../assets/images/ErrorMedia/kaktus.svg";
import { Button } from "../Button/Button";
import style from "./error.module.css";

export default function Error() {
  return (
    <div className={style.mainErrorDiv}>
      <div className={style.errorPicture}>
        <img className={style.fourGreen} src={fourGreen} />
        <img className={style.kaktus} src={kaktus} />
        <img className={style.fourGreen} src={fourGreen} />
      </div>
      <div className={style.errorMessage}>
        <h1 className={style.h1PageNotFound}>Page Not Found</h1>
        <p className={style.pMessage}>
          Sorry, an unexpected error has occurred.
        </p>

        <Link to="/">
          <Button
            className={style.buttonGoHome}
            buttonClass="primary"
            text="Go Home"
          />
        </Link>
      </div>
    </div>
  );
}
//<button className={style.buttonGoHome}>Go Home</button>
