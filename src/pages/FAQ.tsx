
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ = () => {
  const { language } = useLanguage();
  
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = {
    ru: [
      {
        question: 'Как зарегистрироваться на платформе?',
        answer: 'Для регистрации нажмите кнопку "Регистрация" в правом верхнем углу сайта. Заполните необходимые данные: ФИО, ИИН, электронную почту, телефон и придумайте пароль. После регистрации вы получите доступ к личному кабинету.'
      },
      {
        question: 'Что такое ваучер и как его использовать?',
        answer: 'Ваучер – это уникальный код, который дает доступ к тесту. После оплаты вы автоматически получаете ваучер в личном кабинете. Для активации перейдите в раздел "Тесты", введите код ваучера и нажмите "Активировать".'
      },
      {
        question: 'Сколько времени дается на прохождение теста?',
        answer: 'Время прохождения зависит от конкретного теста. Обычно это от 30 минут до 2 часов. Информация о времени отображается перед началом тестирования.'
      },
      {
        question: 'Что делать, если во время теста произошел технический сбой?',
        answer: 'Если во время тестирования произошел технический сбой (отключение интернета, проблемы с браузером), система автоматически сохраняет ваши ответы. Вы можете вернуться к тестированию, авторизовавшись заново. Если проблема не решается, обратитесь в службу поддержки.'
      }
    ],
    kz: [
      {
        question: 'Платформаға қалай тіркелуге болады?',
        answer: 'Тіркелу үшін сайттың жоғарғы оң жағындағы "Тіркелу" түймесін басыңыз. Қажетті деректерді толтырыңыз: аты-жөні, ЖСН, электрондық пошта, телефон және құпия сөз ойлап табыңыз. Тіркелгеннен кейін сіз жеке кабинетке қол жеткізе аласыз.'
      },
      {
        question: 'Ваучер дегеніміз не және оны қалай қолдануға болады?',
        answer: 'Ваучер - тестке қол жеткізуге мүмкіндік беретін бірегей код. Төлемнен кейін сіз жеке кабинетте ваучерді автоматты түрде аласыз. Белсендіру үшін "Тесттер" бөліміне өтіп, ваучер кодын енгізіп, "Белсендіру" түймесін басыңыз.'
      },
      {
        question: 'Тесттен өтуге қанша уақыт беріледі?',
        answer: 'Өту уақыты нақты тестке байланысты. Әдетте бұл 30 минуттан 2 сағатқа дейін. Уақыт туралы ақпарат тестілеу басталар алдында көрсетіледі.'
      },
      {
        question: 'Тест кезінде техникалық ақау орын алса не істеу керек?',
        answer: 'Егер тестілеу кезінде техникалық ақау орын алса (интернет өшсе, браузермен мәселелер), жүйе сіздің жауаптарыңызды автоматты түрде сақтайды. Қайта авторизациядан өту арқылы тестілеуге оралуға болады. Егер мәселе шешілмесе, қолдау қызметіне хабарласыңыз.'
      }
    ]
  };

  const currentFaqs = language === 'ru' ? faqs.ru : faqs.kz;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        {language === 'ru' ? 'Часто задаваемые вопросы' : 'Жиі қойылатын сұрақтар'}
      </h1>

      <div className="space-y-4">
        {currentFaqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleQuestion(index)}
            >
              <span className="font-medium text-lg">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-primary" />
              ) : (
                <ChevronDown size={20} className="text-primary" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
