
import * as XLSX from 'xlsx';
import { VoucherType } from '@/types/voucherTypes';
import { formatDate } from '@/utils/adminUtils';
import { toast } from 'sonner';

export const exportVouchersToExcel = (
  vouchers: VoucherType[], 
  language: string
): void => {
  if (vouchers.length === 0) {
    toast.error(language === 'ru' ? 'Нет ваучеров для экспорта' : 'Экспорттау үшін ваучерлер жоқ');
    return;
  }

  try {
    const vouchersData = vouchers.map(voucher => {
      // Get test name safely
      const testName = voucher.tests && voucher.tests.length > 0 
        ? (language === 'ru' ? voucher.tests[0].title_ru : voucher.tests[0].title_kz)
        : '-';

      return {
        [language === 'ru' ? 'Название' : 'Атауы']: voucher.title,
        [language === 'ru' ? 'Код ваучера' : 'Ваучер коды']: voucher.code,
        [language === 'ru' ? 'Тест' : 'Тест']: testName,
        [language === 'ru' ? 'Пользователь' : 'Пайдаланушы']: voucher.profiles?.full_name || '-',
        [language === 'ru' ? 'Статус' : 'Күйі']: voucher.is_used 
          ? (language === 'ru' ? 'Использован' : 'Қолданылған') 
          : (language === 'ru' ? 'Активен' : 'Белсенді'),
        [language === 'ru' ? 'Дата начала' : 'Басталу күні']: voucher.start_date ? formatDate(voucher.start_date) : '-',
        [language === 'ru' ? 'Дата окончания' : 'Аяқталу күні']: voucher.expiry_date ? formatDate(voucher.expiry_date) : '-',
        [language === 'ru' ? 'Лимит использований' : 'Пайдалану шектеуі']: voucher.usage_limit,
        [language === 'ru' ? 'Использовано' : 'Қолданылған']: voucher.used_count || 0,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(vouchersData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vouchers');
    
    // Generate filename with date
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `vouchers_${date}.xlsx`;
    
    XLSX.writeFile(workbook, fileName);
    
    toast.success(
      language === 'ru' 
        ? `Экспорт завершен: ${fileName}` 
        : `Экспорт аяқталды: ${fileName}`
    );
  } catch (error) {
    console.error('Error exporting vouchers:', error);
    toast.error(
      language === 'ru' 
        ? 'Ошибка при экспорте ваучеров' 
        : 'Ваучерлерді экспорттау кезінде қате'
    );
  }
};
