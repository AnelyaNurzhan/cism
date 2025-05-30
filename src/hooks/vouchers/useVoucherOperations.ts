
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { VoucherType } from '@/types/voucherTypes';
import { exportVouchersToExcel } from '@/components/admin/voucher-list/VoucherExcelExport';

interface VoucherGroup {
  title: string;
  count: number;
  items: VoucherType[];
}

export const useVoucherOperations = () => {
  const { language } = useLanguage();

  const editVoucher = async (voucher: VoucherType) => {
    try {
      // Fixed Supabase query with proper relationship handling
      const { data: voucherData, error: voucherError } = await supabase
        .from('vouchers')
        .select(`
          *,
          voucher_tests!inner(test_id),
          profiles!vouchers_user_id_fkey(full_name)
        `)
        .eq('id', voucher.id)
        .single();
      
      if (voucherError) throw voucherError;
      
      return {
        ...voucherData,
        selectedTests: voucherData.voucher_tests?.map((vt: any) => vt.test_id) || [],
        profiles: voucherData.profiles
      };
    } catch (error) {
      console.error('Error fetching voucher details:', error);
      toast.error(language === 'ru' ? 'Ошибка при загрузке данных ваучера' : 'Ваучер деректерін жүктеу кезінде қате');
      throw error;
    }
  };

  const deleteVoucher = async (id: string) => {
    const confirmed = window.confirm(
      language === 'ru' 
        ? 'Вы уверены, что хотите удалить этот ваучер?' 
        : 'Осы ваучерді жойғыңыз келетініне сенімдісіз бе?'
    );
    
    if (!confirmed) return false;

    try {
      const { error } = await supabase
        .from('vouchers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success(language === 'ru' ? 'Ваучер удален' : 'Ваучер жойылды');
      return true;
    } catch (error) {
      console.error('Error deleting voucher:', error);
      toast.error(language === 'ru' ? 'Ошибка при удалении ваучера' : 'Ваучерді жою кезінде қате');
      return false;
    }
  };

  const deleteVoucherGroup = async (groupTitle: string, vouchers: VoucherType[]) => {
    const confirmed = window.confirm(
      language === 'ru' 
        ? `Вы уверены, что хотите удалить группу "${groupTitle}" (${vouchers.length} ваучеров)?`
        : `"${groupTitle}" тобын жойғыңыз келетініне сенімдісіз бе (${vouchers.length} ваучер)?`
    );
    
    if (!confirmed) return false;

    try {
      const voucherIds = vouchers.map(v => v.id);
      
      const { error } = await supabase
        .from('vouchers')
        .delete()
        .in('id', voucherIds);
      
      if (error) throw error;
      
      toast.success(
        language === 'ru' 
          ? `Группа "${groupTitle}" удалена (${voucherIds.length} ваучеров)`
          : `"${groupTitle}" тобы жойылды (${voucherIds.length} ваучер)`
      );
      return true;
    } catch (error) {
      console.error('Error deleting voucher group:', error);
      toast.error(language === 'ru' ? 'Ошибка при удалении группы ваучеров' : 'Ваучер тобын жою кезінде қате');
      return false;
    }
  };

  const exportVoucherGroup = (group: VoucherGroup) => {
    exportVouchersToExcel(group.items, language);
  };

  return {
    editVoucher,
    deleteVoucher,
    deleteVoucherGroup,
    exportVoucherGroup
  };
};
