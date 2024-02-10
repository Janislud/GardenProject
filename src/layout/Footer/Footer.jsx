import React from "react";
import styles from "./Footer.module.css";
import { GoogleMap } from "../../Components/GoogleMap/GoogleMap";
import { ContactsCards } from "../../Components/ContactsCards/ContactsCards";

export const Footer = () => {
  const contactsCardData = [
    { title: "Phone", content: "+49 999 999 99 99" },
    { title: "Social", content: "" },
    {
      title: "Address",
      content: "Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland",
    },
    { title: "Working Hours", content: "24 hours a day" },
  ];
  return (
    <div className={styles.footer}>
      <h1 className={styles.footerTitle}>Contact</h1>
      <div className={styles.footerCards}>
        {contactsCardData.map(
          /** с помощью метода map перебираем карточки и рендерим ContactCards для каждого элемента массива */
          (item, index) => (
            <ContactsCards
              contactCardConfig={item}
              key={index}
            /> /**также можно здесь использовать item.id в качестве ключа для каждого элемента списка */
          )
        )}
      </div>
      <GoogleMap />
    </div>
  );
};

/**Код представляет собой React компонент под названием Footer, который рендерит футер веб-страницы. В футере отображаются контактные данные (телефон, социальные сети, адрес и часы работы) с использованием компонента ContactsCards и карта с использованием компонента GoogleMap */
