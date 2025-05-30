
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy, Target, TrendingUp, Clock } from 'lucide-react';

interface DashboardStatsProps {
  statistics: {
    totalAttempts: number;
    passedAttempts: number;
    averageScore: number;
    passRate: number;
  };
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ statistics }) => {
  const { language } = useLanguage();

  const stats = [
    {
      title: language === 'ru' ? 'Всего попыток' : 'Барлық әрекеттер',
      value: statistics.totalAttempts,
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: language === 'ru' ? 'Пройдено тестов' : 'Өткен тесттер',
      value: statistics.passedAttempts,
      icon: Trophy,
      color: 'text-green-600'
    },
    {
      title: language === 'ru' ? 'Средний балл' : 'Орташа ұпай',
      value: `${statistics.averageScore}%`,
      icon: Target,
      color: 'text-orange-600'
    },
    {
      title: language === 'ru' ? 'Процент прохождения' : 'Өту пайызы',
      value: `${statistics.passRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
