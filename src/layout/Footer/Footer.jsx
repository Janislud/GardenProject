import React from "react";
import style from "./Footer.module.css";
import { GoogleMap } from "../../Components/GoogleMap/GoogleMap";
import { ContactsCards } from "../../Components/ContactsCards/ContactsCards";
import { useSelector } from "react-redux";

export const Footer = () => {
  const theme = useSelector((state) => state.theme.theme)
  /**Массив объектов создан для облегчения добавления и изменения данных в случае если это потребуется */
  const contactsCardData = [
    { title: "Phone", content: <a href="tel:+499999999999">+49 999 999 99 99</a> },
    { title: "Social", content: "" },
    {
      title: "Address",
      content: "Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland",
    },
    { title: "Working Hours", content: "24 hours a day" },
  ];
  return (
    <footer className={`${style.footerWrapper} ${theme === 'light' ? style.dark : style.light}`}>
      <h1 className={`${style.footerTitle} ${theme === 'light' ? style.dark : style.light}`}>Contact</h1>
      <div className={style.footerCards}>
        {contactsCardData.map(
          /** с помощью метода map перебираем карточки и рендерим ContactCards для каждого элемента массива */
          (card, index) => (
            <ContactsCards
              cardData={card}
              key={index}
            /> /**также можно здесь использовать item.id в качестве ключа для каждого элемента списка */
          )
        )}
      </div>
      <GoogleMap />
    </footer>
  );
};

/**Код представляет собой React компонент под названием Footer, который рендерит футер веб-страницы. В футере отображаются контактные данные (телефон, социальные сети, адрес и часы работы) с использованием компонента ContactsCards и карта с использованием компонента GoogleMap */
