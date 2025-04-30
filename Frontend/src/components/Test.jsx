// src/App.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import Nav from './Index/Nav';

const Test = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // تغيير اللغة عند الضغط على الزر
  };

  return (
    <div className="App ">
      <Nav changeLanguage={changeLanguage} />
      <h1>{t('hello')}</h1>
      <p>{t('welcome')}</p>

      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>العربية</button>
    </div>
  );
}

export default Test;
