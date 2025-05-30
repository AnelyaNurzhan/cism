import React, { createContext, useState, useEffect, useContext } from 'react';

type Language = 'ru' | 'kz';

interface Translations {
  [key: string]: {
    ru: string;
    kz: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Расширим базовые переводы
const translations: Translations = {
  'language': {
    ru: 'ru',
    kz: 'kz',
  },
  'app.title': {
    ru: 'Онлайн-платформа тестирования',
    kz: 'Онлайн тестілеу платформасы',
  },
  'nav.home': {
    ru: 'Главная',
    kz: 'Басты бет',
  },
  'nav.about': {
    ru: 'Тестирование',
    kz: 'Тестілеу',
  },
  'nav.faq': {
    ru: 'Часто задаваемые вопросы',
    kz: 'Жиі қойылатын сұрақтар',
  },
  'nav.rules': {
    ru: 'Правила',
    kz: 'Ережелер',
  },
  'nav.login': {
    ru: 'Вход',
    kz: 'Кіру',
  },
  'nav.register': {
    ru: 'Регистрация',
    kz: 'Тіркелу',
  },
  'nav.dashboard': {
    ru: 'Личный кабинет',
    kz: 'Жеке кабинет',
  },
  'nav.tests': {
    ru: 'Тесты',
    kz: 'Тесттер',
  },
  'nav.admin': {
    ru: 'Панель администратора',
    kz: 'Әкімші панелі',
  },
  'nav.logout': {
    ru: 'Выйти',
    kz: 'Шығу',
  },
  'login.title': {
    ru: 'Вход в систему',
    kz: 'Жүйеге кіру',
  },
  'login.email': {
    ru: 'Электронная почта',
    kz: 'Электрондық пошта',
  },
  'login.password': {
    ru: 'Пароль',
    kz: 'Құпия сөз',
  },
  'login.button': {
    ru: 'Войти',
    kz: 'Кіру',
  },
  'login.register': {
    ru: 'Нет аккаунта? Зарегистрироваться',
    kz: 'Тіркелгіңіз жоқ па? Тіркелу',
  },
  'login.success': {
    ru: 'Вход выполнен успешно',
    kz: 'Жүйеге кіру сәтті болды',
  },
  'login.genericError': {
    ru: 'Ошибка при входе',
    kz: 'Кіру кезінде қате орын алды',
  },
  'register.title': {
    ru: 'Регистрация',
    kz: 'Тіркелу',
  },
  'register.fullName': {
    ru: 'ФИО',
    kz: 'Аты-жөні',
  },
  'register.iin': {
    ru: 'ИИН',
    kz: 'ЖСН',
  },
  'register.phone': {
    ru: 'Телефон',
    kz: 'Телефон',
  },
  'register.email': {
    ru: 'Электронная почта',
    kz: 'Электрондық пошта',
  },
  'register.password': {
    ru: 'Пароль',
    kz: 'Құпия сөз',
  },
  'register.confirmPassword': {
    ru: 'Подтверждение пароля',
    kz: 'Құпия сөзді растау',
  },
  'register.button': {
    ru: 'Зарегистрироваться',
    kz: 'Тіркелу',
  },
  'register.login': {
    ru: 'Уже есть аккаунт? Войти',
    kz: 'Тіркелгіңіз бар ма? Кіру',
  },
  'home.title': {
    ru: 'Добро пожаловать на платформу онлайн-тестирования',
    kz: 'Онлайн тестілеу платформасына қош келдіңіз',
  },
  'home.subtitle': {
    ru: 'Пройдите тесты и получите сертификат',
    kz: 'Тесттерден өтіп, сертификат алыңыз',
  },
  'home.getStarted': {
    ru: 'Начать',
    kz: 'Бастау',
  },
  'test.start': {
    ru: 'Начать тест',
    kz: 'Тестті бастау',
  },
  'test.finish': {
    ru: 'Завершить тест',
    kz: 'Тестті аяқтау',
  },
  'test.next': {
    ru: 'Следующий вопрос',
    kz: 'Келесі сұрақ',
  },
  'test.prev': {
    ru: 'Предыдущий вопрос',
    kz: 'Алдыңғы сұрақ',
  },
  'test.time': {
    ru: 'Оставшееся время',
    kz: 'Қалған уақыт',
  },
  'home.features.interface.title': {
    ru: 'Удобный интерфейс',
    kz: 'Ыңғайлы интерфейс',
  },
  'home.features.interface.description': {
    ru: 'Интуитивно понятный интерфейс для комфортного прохождения тестов',
    kz: 'Тесттерді жайлы өткізу үшін интуитивті түсінікті интерфейс',
  },
  'home.features.tests.title': {
    ru: 'Разнообразные тесты',
    kz: 'Түрлі тесттер',
  },
  'home.features.tests.description': {
    ru: 'Тесты разных категорий и уровней сложности',
    kz: 'Әртүрлі санаттар мен күрделілік деңгейлеріндегі тесттер',
  },
  'home.features.results.title': {
    ru: 'Мгновенные результаты',
    kz: 'Жылдам нәтижелер',
  },
  'home.features.results.description': {
    ru: 'Получайте результаты сразу после завершения теста',
    kz: 'Тест аяқталғаннан кейін бірден нәтижелерді алыңыз',
  },
  'home.howto.title': {
    ru: 'Как начать пользоваться платформой?',
    kz: 'Платформаны пайдалануды қалай бастауға болады?',
  },
  'home.howto.step1.title': {
    ru: 'Регистрация',
    kz: 'Тіркелу',
  },
  'home.howto.step1.description': {
    ru: 'Создайте аккаунт на платформе',
    kz: 'Платформада тіркелгі жасаңыз',
  },
  'home.howto.step2.title': {
    ru: 'Оплата',
    kz: 'Төлем',
  },
  'home.howto.step2.description': {
    ru: 'Оплатите доступ к тестам',
    kz: 'Тесттерге қол жеткізуге ақы төлеңіз',
  },
  'home.howto.step3.title': {
    ru: 'Ваучер',
    kz: 'Ваучер',
  },
  'home.howto.step3.description': {
    ru: 'Получите ваучер на доступ',
    kz: 'Кіруге арналған ваучер алыңыз',
  },
  'home.howto.step4.title': {
    ru: 'Тестирование',
    kz: 'Тестілеу',
  },
  'home.howto.step4.description': {
    ru: 'Пройдите тесты и получите результаты',
    kz: 'Тесттерден өтіп, нәтижелерді алыңыз',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem('language');
    return (storedLanguage as Language) || 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
