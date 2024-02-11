import React from "react";
import styles from "./ContactsCards.module.css";
import instagram from "../../assets/images/FooterMedia/ic-instagram.svg";
import whatsapp from "../../assets/images/FooterMedia/ic-whatsapp.svg";

export const ContactsCards = ({ contactCardConfig }) => {
  /**этот объект содержит конфигурацию для конкретной карточки */
  return (
    <div className={styles.contactsCards}>
      <div className={styles.contactsCardsTitle}>{contactCardConfig.title}</div>

      {contactCardConfig.content /**внутри тернарного оператора проверяется содержит ли контент, если да то отображается текст если нет то картинка */ ? (
        <div className={styles.contactsCardsContent}>
          {contactCardConfig.content}
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
