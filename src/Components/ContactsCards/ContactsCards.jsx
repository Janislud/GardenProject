import React from "react";
import { useSelector } from "react-redux";
import whatsAppWhite from "../../assets/images/FooterMedia/WhatsAppWhite.svg";
import instagram from "../../assets/images/FooterMedia/ic-instagram.svg";
import whatsapp from "../../assets/images/FooterMedia/ic-whatsapp.svg";
import instagramWhite from "../../assets/images/FooterMedia/instagramWhite.svg";
import style from "./ContactsCards.module.css";

export const ContactsCards = ({ cardData }) => {
  /**этот объект содержит данные для конкретной карточки */
  const isSocialMedia = cardData.title === "Social";
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`${style.contactsCards} ${
        theme === "light" ? style.dark : style.light
      }`}
    >
      <div
        className={`${style.contactsCardsTitle} ${
          theme === "light" ? style.dark : style.light
        } `}
      >
        {cardData.title}
      </div>

      {cardData.content ? (
        <div
          className={`${style.contactsCardsContent} ${
            theme === "light" ? style.dark : style.light
          }`}
        >
          {cardData.content}
        </div>
      ) : (
        isSocialMedia && (
          <div className={style.contactsCardsImages}>
            <a
              className={style.instaIcon}
              href="https://www.instagram.com/startainstitute?igsh=MTNraWR1cHh3MjdpaA=="
            >
              {theme === "light" ? (
                <img src={instagramWhite} alt="instagram" />
              ) : (
                <img src={instagram} alt="instagram" />
              )}
            </a>
            <a
              className={style.whatsappIcon}
              href="https://wa.me/+499999999999"
            >
              {theme === "light" ? (
                <img src={whatsAppWhite} alt="whatsApp" />
              ) : (
                <img src={whatsapp} alt="whatsApp" />
              )}
            </a>
          </div>
        )
      )}
    </div>
  );
};
