
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CertificateVerifier from '@/components/certificate/CertificateVerifier';

const Certificate: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {language === 'ru' ? 'Проверка сертификатов' : 'Сертификаттарды тексеру'}
      </h1>
      
      <CertificateVerifier />
    </section>
  );
};

export default Certificate;
