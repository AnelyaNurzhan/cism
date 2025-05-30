
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VerificationResultProps {
  result: {
    isValid: boolean;
    data?: {
      name: string;
      expiryDate: string;
    };
    error?: string;
  };
}

const VerificationResult: React.FC<VerificationResultProps> = ({ result }) => {
  const { language } = useLanguage();
  
  if (result.isValid) {
    return (
      <Card className="border-green-500 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <h3 className="text-base font-medium text-green-700">
              {language === 'ru' ? 'Сертификат действителен' : 'Сертификат жарамды'}
            </h3>
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="bg-white p-3 rounded border border-gray-100">
              <span className="block text-xs text-gray-500 mb-1">
                {language === 'ru' ? 'ФИО владельца' : 'Иесінің аты-жөні'}
              </span>
              <span className="font-medium">{result.data?.name}</span>
            </div>

            <div className="bg-white p-3 rounded border border-gray-100">
              <span className="block text-xs text-gray-500 mb-1">
                {language === 'ru' ? 'Срок действия' : 'Жарамдылық мерзімі'}
              </span>
              <span className="font-medium">
                {language === 'ru' ? 'до' : ''} {result.data?.expiryDate}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-red-300 bg-red-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{result.error}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationResult;
