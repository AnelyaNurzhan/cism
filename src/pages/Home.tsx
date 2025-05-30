
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();

  console.log('=== HOME PAGE DEBUG ===');
  console.log('Home page rendered');
  console.log('Current language:', language);
  console.log('Is authenticated:', isAuthenticated);

  // Define translations directly for Home page
  const translations = {
    ru: {
      title: 'Платформа тестирования специалистов',
      subtitle: 'Проверяйте свои знания и получайте сертификаты по различным специализациям',
      getStarted: 'Начать тестирование',
      features: {
        interface: {
          title: 'Удобный интерфейс',
          description: 'Интуитивно понятная навигация и приятный дизайн для комфортной работы'
        },
        tests: {
          title: 'Разнообразные тесты',
          description: 'Тесты разного уровня сложности по различным специализациям'
        },
        results: {
          title: 'Мгновенные результаты',
          description: 'Получайте результаты и сертификаты сразу после завершения теста'
        }
      },
      howto: {
        title: 'Как это работает',
        step1: {
          title: 'Выберите специализацию',
          description: 'Найдите интересующую вас область знаний'
        },
        step2: {
          title: 'Выберите уровень',
          description: 'Определите подходящий уровень сложности'
        },
        step3: {
          title: 'Пройдите тест',
          description: 'Ответьте на все вопросы в рамках отведенного времени'
        },
        step4: {
          title: 'Получите результат',
          description: 'Узнайте свой результат и получите сертификат'
        }
      }
    },
    kz: {
      title: 'Мамандарды тестілеу платформасы',
      subtitle: 'Өз біліміңізді тексеріп, әртүрлі мамандықтар бойынша сертификаттар алыңыз',
      getStarted: 'Тестілеуді бастау',
      features: {
        interface: {
          title: 'Ыңғайлы интерфейс',
          description: 'Ыңғайлы жұмыс үшін интуитивті навигация және жағымды дизайн'
        },
        tests: {
          title: 'Әртүрлі тесттер',
          description: 'Әртүрлі мамандықтар бойынша әртүрлі күрделілік деңгейіндегі тесттер'
        },
        results: {
          title: 'Жылдам нәтижелер',
          description: 'Тестті аяқтағаннан кейін бірден нәтижелер мен сертификаттар алыңыз'
        }
      },
      howto: {
        title: 'Бұл қалай жұмыс істейді',
        step1: {
          title: 'Мамандықты таңдаңыз',
          description: 'Өзіңізді қызықтыратын білім саласын табыңыз'
        },
        step2: {
          title: 'Деңгейді таңдаңыз',
          description: 'Күрделіліктің тиісті деңгейін анықтаңыз'
        },
        step3: {
          title: 'Тестті өтіңіз',
          description: 'Берілген уақыт ішінде барлық сұрақтарға жауап беріңіз'
        },
        step4: {
          title: 'Нәтижені алыңыз',
          description: 'Нәтижеңізді біліп, сертификат алыңыз'
        }
      }
    }
  };

  const t = (key) => {
    console.log('Translation requested for key:', key);
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        console.warn('Translation not found for key:', key);
        return key;
      }
    }
    
    console.log('Translation result:', value);
    return value;
  };

  // Pre-compute features for logging
  const features = [
    t('features.interface'),
    t('features.tests'),
    t('features.results')
  ];

  const steps = [
    t('howto.step1'),
    t('howto.step2'),
    t('howto.step3'),
    t('howto.step4')
  ];

  // Log button rendering decision
  if (isAuthenticated) {
    console.log('Rendering authenticated user buttons');
  } else {
    console.log('Rendering non-authenticated user buttons');
  }

  // Log features section
  console.log('Rendering features section');
  features.forEach((feature, index) => {
    console.log(`Rendering feature ${index + 1}:`, feature);
  });

  // Log how-to section
  console.log('Rendering how-to section');
  steps.forEach((item, index) => {
    console.log(`Rendering step ${index + 1}:`, item);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-primary">{t('title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('subtitle')}</p>

        {isAuthenticated ? (
          <Link 
            to="/specializations" 
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            onClick={() => console.log('Navigate to specializations clicked')}
          >
            {t('getStarted')}
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/login" 
              className="px-6 py-3 bg-white border border-primary text-primary rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => console.log('Navigate to login clicked')}
            >
              {language === 'ru' ? 'Войти' : 'Кіру'}
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
              onClick={() => console.log('Navigate to register clicked')}
            >
              {language === 'ru' ? 'Регистрация' : 'Тіркелу'}
            </Link>
          </div>
        )}
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <CheckCircle className="text-primary mb-4" size={36} />
              <h3 className="text-xl font-medium mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t('howto.title')}
        </h2>
        
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mb-4">
                {`0${index + 1}`}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

console.log('Home component module loaded');

export default Home;
