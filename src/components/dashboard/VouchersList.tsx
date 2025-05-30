
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { Calendar, Gift, ExternalLink } from 'lucide-react';

interface Voucher {
  id: string;
  testName: {
    ru: string;
    kz: string;
  };
  expiry: string;
  used: boolean;
}

interface VouchersListProps {
  vouchers: Voucher[];
}

const VouchersList: React.FC<VouchersListProps> = ({ vouchers }) => {
  const { language } = useLanguage();

  if (vouchers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500 border">
        {language === 'ru' 
          ? 'У вас нет доступных ваучеров' 
          : 'Сізде қол жетімді ваучерлер жоқ'}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {vouchers.map((voucher) => (
        <div key={voucher.id} className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-2">
                <Gift size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                <h3 className="font-medium text-gray-900 truncate">
                  {voucher.testName[language === 'ru' ? 'ru' : 'kz']}
                </h3>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  <strong>{language === 'ru' ? 'Код' : 'Код'}:</strong> 
                  <span className="font-mono ml-1 bg-gray-100 px-2 py-1 rounded text-xs">
                    {voucher.id}
                  </span>
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Calendar size={12} className="mr-1" />
                  <strong>{language === 'ru' ? 'До' : 'Дейін'}:</strong>
                  <span className="ml-1">
                    {new Date(voucher.expiry).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2 flex-shrink-0 ml-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                voucher.used 
                  ? 'bg-gray-100 text-gray-600' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {voucher.used 
                  ? (language === 'ru' ? 'Использован' : 'Қолданылған')
                  : (language === 'ru' ? 'Активен' : 'Белсенді')
                }
              </span>
              
              {!voucher.used && (
                <Link 
                  to="/tests" 
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  {language === 'ru' ? 'Использовать' : 'Қолдану'}
                  <ExternalLink size={12} className="ml-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VouchersList;
