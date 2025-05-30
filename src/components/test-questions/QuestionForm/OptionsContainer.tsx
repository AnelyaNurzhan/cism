
import React, { useRef } from 'react';
import { Plus, Trash } from 'lucide-react';
import { OptionsContainerProps } from '@/types/questions';

const OptionsContainer: React.FC<OptionsContainerProps> = ({ 
  initialOptions, 
  correctAnswers, 
  language 
}) => {
  const optionsContainerRef = useRef<HTMLDivElement>(null);

  const handleAddOption = () => {
    if (!optionsContainerRef.current) return;
    
    const optionsCount = optionsContainerRef.current.children.length;
    
    if (optionsCount >= 10) {
      alert(language === 'ru' ? 'Максимальное количество вариантов: 10' : 'Нұсқалардың максималды саны: 10');
      return;
    }
    
    const newOption = document.createElement('div');
    newOption.className = 'grid grid-cols-12 gap-2 items-start mt-3';
    newOption.innerHTML = `
      <div class="col-span-1 pt-2">
        <input type="checkbox" name="correctOptions[]" value="${optionsCount + 1}" class="h-4 w-4" />
      </div>
      <div class="col-span-5">
        <input
          type="text"
          name="optionTextRu${optionsCount}"
          placeholder="${language === 'ru' ? `Вариант ${optionsCount + 1} (RU)` : `Нұсқа ${optionsCount + 1} (RU)`}"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="col-span-5">
        <input
          type="text"
          name="optionTextKz${optionsCount}"
          placeholder="${language === 'ru' ? `Вариант ${optionsCount + 1} (KZ)` : `Нұсқа ${optionsCount + 1} (KZ)`}"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="col-span-1 pt-2 text-center">
        <button type="button" class="text-red-600 hover:text-red-800 remove-option">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;
    
    optionsContainerRef.current.appendChild(newOption);
    
    // Add event listener to the remove button
    const removeButton = newOption.querySelector('.remove-option');
    removeButton?.addEventListener('click', () => {
      optionsContainerRef.current?.removeChild(newOption);
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ru' ? 'Варианты ответов' : 'Жауап нұсқалары'}
        </label>
        <button 
          type="button"
          className="text-primary text-sm flex items-center"
          onClick={handleAddOption}
        >
          <Plus size={14} className="mr-1" />
          {language === 'ru' ? 'Добавить вариант' : 'Нұсқа қосу'}
        </button>
      </div>

      <div 
        id="optionsContainer" 
        ref={optionsContainerRef}
        className="space-y-3 border border-gray-200 rounded-md p-4"
      >
        {/* Initial Options */}
        {(initialOptions || Array(4).fill({})).map((option: any, index: number) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-start">
            <div className="col-span-1 pt-2">
              <input 
                type="checkbox" 
                name="correctOptions[]"
                value={index + 1}
                className="h-4 w-4" 
                defaultChecked={correctAnswers?.includes(index + 1)} 
              />
            </div>
            <div className="col-span-5">
              <input
                type="text"
                name={`optionTextRu${index}`}
                placeholder={language === 'ru' ? `Вариант ${index + 1} (RU)` : `Нұсқа ${index + 1} (RU)`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={option.text || ''}
                required
              />
            </div>
            <div className="col-span-5">
              <input
                type="text"
                name={`optionTextKz${index}`}
                placeholder={language === 'ru' ? `Вариант ${index + 1} (KZ)` : `Нұсқа ${index + 1} (KZ)`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={option.textKz || ''}
                required
              />
            </div>
            <div className="col-span-1 pt-2 text-center">
              {index > 1 && (
                <button 
                  type="button" 
                  className="text-red-600 hover:text-red-800 remove-option"
                  onClick={(e) => {
                    const parent = (e.target as HTMLElement).closest('.grid');
                    parent?.parentNode?.removeChild(parent);
                  }}
                >
                  <Trash size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsContainer;
