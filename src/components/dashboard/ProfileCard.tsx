
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

interface ProfileCardProps {
  profile: {
    fullName: string;
    iin: string | null;
    email: string;
    phone: string | null;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { language } = useLanguage();

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {language === 'ru' ? 'Персональные данные' : 'Жеке деректер'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <span className="font-medium text-gray-700">
            {language === 'ru' ? 'ФИО' : 'Аты-жөні'}:
          </span>
          <span className="ml-2 text-gray-900">{profile.fullName}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">
            {language === 'ru' ? 'ИИН' : 'ЖСН'}:
          </span>
          <span className="ml-2 text-gray-900">{profile.iin || '-'}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Email:</span>
          <span className="ml-2 text-gray-900">{profile.email}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">
            {language === 'ru' ? 'Телефон' : 'Телефон'}:
          </span>
          <span className="ml-2 text-gray-900">{profile.phone || '-'}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
