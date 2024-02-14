import React from "react";
import instagram from "../../assets/images/FooterMedia/ic-instagram.svg";
import whatsapp from "../../assets/images/FooterMedia/ic-whatsapp.svg";
import styles from "./ContactsCards.module.css";

export const ContactsCards = ({ cardData }) => {
  /**этот объект содержит данные для конкретной карточки */
  return (
    <div className={styles.contactsCards}>
      <div className={styles.contactsCardsTitle}>{cardData.title}</div>

      {cardData.content /**внутри тернарного оператора проверяется содержит ли контент, если да то отображается текст если нет то картинка */ ? (
        <div className={styles.contactsCardsContent}>
          {cardData.content}
        </div>
      ) : (
        <div className={styles.contactsCardsImages}>
          <img src={instagram} alt="instagram" />
          <img src={whatsapp} alt="whatsapp" />
        </div>
      )}
    </div>
  );
};
