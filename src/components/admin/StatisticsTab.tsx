import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface StatisticsTabProps {
  users: any[];
  tests: any[];
  vouchers: any[];
}

export const StatisticsTab: React.FC<StatisticsTabProps> = ({ 
  users, 
  tests, 
  vouchers 
}) => {
  const { language } = useLanguage();
  const [testAttempts, setTestAttempts] = useState<any[]>([]);
  const [voucherStats, setVoucherStats] = useState({
    active: 0,
    used: 0,
    expired: 0
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [testCompletionRate, setTestCompletionRate] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate counts from props
  const usersCount = users.length;
  const testsCount = tests.length;
  const vouchersCount = vouchers.length;
  
  // Get popular tests from props
  const popularTests = tests.slice(0, 5);
  
  useEffect(() => {
    fetchStatisticsData();
  }, []);
  
  const fetchStatisticsData = async () => {
    setIsLoading(true);
    try {
      // Fetch test attempts
      const { data: attemptsData } = await supabase
        .from('test_attempts')
        .select('*');
      
      if (attemptsData) {
        setTestAttempts(attemptsData);
        
        // Generate chart data based on real test attempts
        generateChartData(attemptsData);
        
        // Calculate test completion rates
        calculateTestCompletionRate(attemptsData);
      }
      
      // Calculate voucher statistics
      const now = new Date();
      
      // Calculate stats from vouchers prop
      const activeVouchers = vouchers.filter(v => !v.is_used && new Date(v.expiry_date) > now);
      const usedVouchers = vouchers.filter(v => v.is_used);
      const expiredVouchers = vouchers.filter(v => !v.is_used && new Date(v.expiry_date) <= now);
      
      setVoucherStats({
        active: activeVouchers.length,
        used: usedVouchers.length,
        expired: expiredVouchers.length
      });
      
    } catch (error) {
      console.error('Error fetching statistics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate data for chart based on test attempts
  const generateChartData = (attempts: any[]) => {
    // Group attempts by date (last 7 days)
    const now = new Date();
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateString = date.toLocaleDateString();
      
      // Filter attempts for this date
      const dateAttempts = attempts.filter(attempt => {
        const attemptDate = new Date(attempt.created_at);
        return attemptDate.toLocaleDateString() === dateString;
      });
      
      // Count passed attempts
      const passedAttempts = dateAttempts.filter(attempt => attempt.passed).length;
      
      data.push({
        date: dateString,
        attempts: dateAttempts.length,
        passed: passedAttempts
      });
    }
    
    setChartData(data);
  };
  
  // Calculate test completion rates for pie chart
  const calculateTestCompletionRate = (attempts: any[]) => {
    const passed = attempts.filter(attempt => attempt.passed).length;
    const failed = attempts.filter(attempt => attempt.passed === false).length;
    const incomplete = attempts.filter(attempt => attempt.passed === null).length;
    
    setTestCompletionRate([
      { name: language === 'ru' ? 'Пройдено' : 'Өткендер', value: passed, color: '#4ade80' },
      { name: language === 'ru' ? 'Не пройдено' : 'Өтпегендер', value: failed, color: '#f87171' },
      { name: language === 'ru' ? 'Не завершено' : 'Аяқталмаған', value: incomplete, color: '#fbbf24' }
    ]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">
        {language === 'ru' ? 'Статистика' : 'Статистика'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4 text-blue-600">
            {language === 'ru' ? 'Пользователи' : 'Пайдаланушылар'}
          </h3>
          <div className="text-3xl font-bold">{usersCount}</div>
          <div className="text-sm text-gray-500 mt-2">
            {language === 'ru' ? 'Всего зарегистрировано' : 'Барлығы тіркелген'}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4 text-green-600">
            {language === 'ru' ? 'Тесты' : 'Тесттер'}
          </h3>
          <div className="text-3xl font-bold">{testsCount}</div>
          <div className="text-sm text-gray-500 mt-2">
            {language === 'ru' ? 'Всего создано' : 'Барлығы құрылған'}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4 text-purple-600">
            {language === 'ru' ? 'Ваучеры' : 'Ваучерлер'}
          </h3>
          <div className="text-3xl font-bold">{vouchersCount}</div>
          <div className="text-sm text-gray-500 mt-2">
            {language === 'ru' ? 'Всего выпущено' : 'Барлығы шығарылған'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">
            {language === 'ru' ? 'Статистика ваучеров' : 'Ваучерлер статистикасы'}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{language === 'ru' ? 'Активные:' : 'Белсенді:'}</span>
              <span className="font-medium text-green-600">{voucherStats.active}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{language === 'ru' ? 'Использованные:' : 'Қолданылған:'}</span>
              <span className="font-medium text-blue-600">{voucherStats.used}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{language === 'ru' ? 'Истекшие:' : 'Мерзімі өткен:'}</span>
              <span className="font-medium text-orange-600">{voucherStats.expired}</span>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{language === 'ru' ? 'Всего:' : 'Барлығы:'}</span>
                <span className="font-medium">{vouchersCount}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">
            {language === 'ru' ? 'Популярные тесты' : 'Танымал тесттер'}
          </h3>
          <div className="space-y-4">
            {popularTests.slice(0, 5).map((test, index) => (
              <div key={test.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs mr-3">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 truncate max-w-[70%]">
                    {language === 'ru' ? test.title_ru : test.title_kz}
                  </span>
                </div>
                <span className="font-medium">
                  {testAttempts.filter(attempt => attempt.test_id === test.id).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-6">
            {language === 'ru' ? 'Динамика прохождения тестов' : 'Тесттерді өткізу динамикасы'}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="attempts" 
                  name={language === 'ru' ? 'Попытки' : 'Әрекеттер'} 
                  fill="#8884d8" 
                />
                <Bar 
                  dataKey="passed" 
                  name={language === 'ru' ? 'Пройдено' : 'Өткендер'} 
                  fill="#82ca9d" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-6">
            {language === 'ru' ? 'Успешность прохождения тестов' : 'Тесттердің сәтті өтуі'}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={testCompletionRate}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {testCompletionRate.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-6">
          {language === 'ru' ? 'Активность пользователей' : 'Пайдаланушы белсенділігі'}
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{language === 'ru' ? 'Активных сегодня:' : 'Бүгін белсенді:'}</span>
            <span className="font-medium text-green-600">
              {testAttempts.filter(attempt => {
                const today = new Date();
                const attemptDate = new Date(attempt.created_at);
                return attemptDate.toDateString() === today.toDateString();
              }).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{language === 'ru' ? 'Активных за неделю:' : 'Апта бойы белсенді:'}</span>
            <span className="font-medium text-blue-600">
              {testAttempts.filter(attempt => {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                const attemptDate = new Date(attempt.created_at);
                return attemptDate >= oneWeekAgo;
              }).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{language === 'ru' ? 'Активных за месяц:' : 'Ай бойы белсенді:'}</span>
            <span className="font-medium text-orange-600">
              {testAttempts.filter(attempt => {
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                const attemptDate = new Date(attempt.created_at);
                return attemptDate >= oneMonthAgo;
              }).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
