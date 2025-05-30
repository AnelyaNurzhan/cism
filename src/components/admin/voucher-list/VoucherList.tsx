
import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { VoucherListItem } from './VoucherListItem';
import { VoucherType, VoucherGroupType } from '@/types/voucherTypes';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table';

interface VoucherListProps {
  vouchers: VoucherType[];
  onEdit: (voucher: VoucherType) => void;
  onDelete: (id: string) => void;
}

export const VoucherList: React.FC<VoucherListProps> = ({ 
  vouchers, 
  onEdit, 
  onDelete 
}) => {
  const { language } = useLanguage();

  const voucherGroups = useMemo(() => {
    // Group vouchers by title
    const groups: Record<string, VoucherType[]> = {};
    
    vouchers.forEach(voucher => {
      const title = voucher.title || 'Без названия';
      if (!groups[title]) {
        groups[title] = [];
      }
      groups[title].push(voucher);
    });
    
    // Convert to array and add counts
    return Object.entries(groups).map(([title, items]): VoucherGroupType => ({
      title,
      vouchers: items,
      totalCount: items.length,
      activeCount: items.filter(v => !v.is_used).length,
      usedCount: items.filter(v => v.is_used).length
    }));
  }, [vouchers]);

  if (vouchers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        {language === 'ru' ? 'Ваучеры не найдены' : 'Ваучерлер табылмады'}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        {voucherGroups.map((group, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left">
                <span className="font-medium text-lg">{group.title}</span>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-gray-600">
                    {language === 'ru' ? 'Всего:' : 'Барлығы:'} {group.totalCount}
                  </span>
                  <span className="text-green-600">
                    {language === 'ru' ? 'Активных:' : 'Белсенді:'} {group.activeCount}
                  </span>
                  <span className="text-blue-600">
                    {language === 'ru' ? 'Использовано:' : 'Қолданылған:'} {group.usedCount}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {language === 'ru' ? 'Код ваучера' : 'Ваучер коды'}
                      </TableHead>
                      <TableHead>
                        {language === 'ru' ? 'Тесты' : 'Тесттер'}
                      </TableHead>
                      <TableHead>
                        {language === 'ru' ? 'Статус' : 'Күйі'}
                      </TableHead>
                      <TableHead>
                        {language === 'ru' ? 'Использовано' : 'Қолданылған'}
                      </TableHead>
                      <TableHead>
                        {language === 'ru' ? 'Срок действия' : 'Жарамдылық мерзімі'}
                      </TableHead>
                      <TableHead className="text-right">
                        {language === 'ru' ? 'Действия' : 'Әрекеттер'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.vouchers.map((voucher) => (
                      <VoucherListItem
                        key={voucher.id}
                        voucher={voucher}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
