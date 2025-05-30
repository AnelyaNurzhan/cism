
import React, { useRef } from 'react';
import { Plus, Upload, Download } from 'lucide-react';
import { ActionButtonsProps } from '@/types/questions';
import { Button } from '@/components/ui/button';

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onAdd, 
  onImport, 
  onExport, 
  language 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input reference not set");
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name, file.type, file.size);
      onImport(file);
      // Reset the input value so the same file can be selected again
      event.target.value = '';
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        onClick={onAdd}
        variant="default"
        className="flex items-center"
      >
        <Plus size={16} className="mr-2" />
        {language === 'ru' ? 'Добавить вопрос' : 'Сұрақ қосу'}
      </Button>
      
      <Button 
        onClick={handleImportClick}
        variant="secondary"
        className="flex items-center"
        type="button"
      >
        <Upload size={16} className="mr-2" />
        {language === 'ru' ? 'Импорт' : 'Импорт'}
      </Button>
      
      <Button 
        onClick={onExport}
        variant="outline"
        className="flex items-center"
      >
        <Download size={16} className="mr-2" />
        {language === 'ru' ? 'Экспорт' : 'Экспорт'}
      </Button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx,.xls"
        className="hidden"
        aria-label={language === 'ru' ? 'Импорт файла' : 'Файлды импорттау'}
      />
    </div>
  );
};

export default ActionButtons;
