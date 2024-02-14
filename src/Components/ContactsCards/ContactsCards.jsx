import React from "react";
import instagram from "../../assets/images/FooterMedia/ic-instagram.svg";
import whatsapp from "../../assets/images/FooterMedia/ic-whatsapp.svg";
import styles from "./ContactsCards.module.css";

export const ContactsCards = ({ cardData }) => {
  /**этот объект содержит данные для конкретной карточки */
  const isSocialMedia = cardData.title === "Social";

  return (
    <div className={styles.contactsCards}>
      <div className={styles.contactsCardsTitle}>{cardData.title}</div>

      {cardData.content ? (
        <div className={styles.contactsCardsContent}>
          {cardData.content}
        </div>
      ) : (
        isSocialMedia && (
          <div className={styles.contactsCardsImages}>
            <a href="https://www.instagram.com/startainstitute?igsh=MTNraWR1cHh3MjdpaA=="><img src={instagram} alt="instagram" /></a>
            <a href="https://wa.me/+499999999999"><img src={whatsapp} alt="whatsapp" /></a>
          </div>
        )
      )}
    </div>
  );
};
