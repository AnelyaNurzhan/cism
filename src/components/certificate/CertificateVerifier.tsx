
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import VerificationResult from "./VerificationResult";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';

const CertificateVerifier = () => {
  const { language } = useLanguage();
  const [certificateNumber, setCertificateNumber] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { toast } = useToast();

  // Выполняем запрос только когда пользователь запускает верификацию
  const { 
    data: result, 
    isLoading: isVerifying, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['certificate', certificateNumber],
    queryFn: async () => {
      if (!certificateNumber.trim()) {
        throw new Error("empty_certificate");
      }

      const { data, error } = await supabase
        .from('certificates')
        .select('full_name, expiry_date')
        .eq('certificate_number', certificateNumber.trim())
        .single();

      if (error) {
        console.error("Error verifying certificate:", error);
        throw error;
      }

      if (!data) {
        throw new Error("certificate_not_found");
      }

      // Format the expiry date
      const expiryDate = new Date(data.expiry_date);
      const formattedExpiryDate = language === 'ru'
        ? expiryDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
        : expiryDate.toLocaleDateString('kk-KZ', { day: 'numeric', month: 'long', year: 'numeric' });
      
      return {
        isValid: true,
        data: {
          name: data.full_name,
          expiryDate: formattedExpiryDate
        }
      };
    },
    enabled: searchTriggered && !!certificateNumber.trim(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 минут - данные валидны долгое время
  });

  const processedResult = React.useMemo(() => {
    if (error) {
      if (error.message === "empty_certificate") {
        return null; // Этот случай обрабатывается до запроса
      } else if (error.message === "certificate_not_found") {
        return {
          isValid: false,
          error: language === 'ru'
            ? "Ошибка: регистрационный номер не найден или введён неверно."
            : "Қате: тіркеу нөмірі табылмады немесе дұрыс енгізілмеген."
        };
      } else {
        return {
          isValid: false,
          error: language === 'ru'
            ? "Ошибка при проверке сертификата. Пожалуйста, попробуйте позже."
            : "Сертификатты тексеру кезінде қате. Кейінірек қайталап көріңіз."
        };
      }
    }
    
    return result || null;
  }, [result, error, language]);

  const handleVerify = () => {
    // Reset previous results
    if (!certificateNumber.trim()) {
      toast({
        title: language === 'ru' ? "Ошибка" : "Қате",
        description: language === 'ru' 
          ? "Пожалуйста, введите регистрационный номер сертификата" 
          : "Сертификаттың тіркеу нөмірін енгізіңіз",
        variant: "destructive",
      });
      return;
    }

    setSearchTriggered(true);
    refetch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <Card className="max-w-md mx-auto overflow-visible">
      <div className="p-6">
        <header className="mb-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            {language === 'ru' ? "Проверка сертификата" : "Сертификатты тексеру"}
          </h2>
          <p className="text-gray-600 text-sm">
            {language === 'ru' 
              ? "Введите регистрационный номер сертификата для проверки" 
              : "Тексеру үшін сертификаттың тіркеу нөмірін енгізіңіз"}
          </p>
        </header>

        <div className="space-y-4">
          <Input
            placeholder={language === 'ru' ? "Введите номер сертификата" : "Сертификат нөмірін енгізіңіз"}
            value={certificateNumber}
            onChange={(e) => setCertificateNumber(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-white border-gray-300 focus:border-primary"
            autoComplete="off"
          />
          
          <Button 
            className="w-full" 
            onClick={handleVerify}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                {language === 'ru' ? "Проверка..." : "Тексеру..."}
              </span>
            ) : (
              language === 'ru' ? "Проверить" : "Тексеру"
            )}
          </Button>
        </div>
      </div>

      {processedResult && (
        <div className="mt-4 p-4 animate-in fade-in-50 duration-300">
          <VerificationResult result={processedResult} />
        </div>
      )}
    </Card>
  );
};

export default CertificateVerifier;
