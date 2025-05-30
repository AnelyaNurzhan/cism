
// Utility functions for translations in the admin panel

/**
 * Get translated status text
 */
export const getStatusText = (status: string, language: string) => {
  if (language === 'ru') {
    switch (status) {
      case 'active': return 'Активен';
      case 'blocked': return 'Заблокирован';
      case 'used': return 'Использован';
      case 'expired': return 'Просрочен';
      default: return status;
    }
  } else {
    switch (status) {
      case 'active': return 'Белсенді';
      case 'blocked': return 'Бұғатталған';
      case 'used': return 'Қолданылған';
      case 'expired': return 'Мерзімі өткен';
      default: return status;
    }
  }
};

/**
 * Get translated difficulty text
 */
export const getDifficultyText = (level: string, language: string) => {
  if (language === 'ru') {
    switch (level) {
      case 'easy': return 'Легкий';
      case 'medium': return 'Средний';
      case 'hard': return 'Сложный';
      default: return level;
    }
  } else {
    switch (level) {
      case 'easy': return 'Оңай';
      case 'medium': return 'Орташа';
      case 'hard': return 'Күрделі';
      default: return level;
    }
  }
};

/**
 * Get translated category text
 */
export const getCategoryText = (category: string, language: string) => {
  if (language === 'ru') {
    switch (category) {
      case 'security': return 'Безопасность';
      case 'network': return 'Сетевая безопасность';
      case 'legal': return 'Законодательство';
      default: return category;
    }
  } else {
    switch (category) {
      case 'security': return 'Қауіпсіздік';
      case 'network': return 'Желілік қауіпсіздік';
      case 'legal': return 'Заңнама';
      default: return category;
    }
  }
};

