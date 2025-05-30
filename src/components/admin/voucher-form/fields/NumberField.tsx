
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NumberFieldProps {
  id: string;
  label: string;
  value: string | number | null;
  onChange: (value: string | number | null) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  help?: string;
}

export const NumberField: React.FC<NumberFieldProps> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  min, 
  max,
  placeholder,
  help
}) => {
  // Use a string for the input value to handle empty state
  const [inputValue, setInputValue] = useState<string>(
    value !== null ? (typeof value === 'number' ? value.toString() : value) : ''
  );
  
  // Update inputValue when value prop changes
  useEffect(() => {
    if (value !== null) {
      setInputValue(typeof value === 'number' ? value.toString() : value);
    } else {
      setInputValue('');
    }
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Allow empty input (will be treated as null)
    if (newValue === '') {
      setInputValue('');
      onChange(null);
      return;
    }
    
    // Only accept numbers
    if (/^\d*$/.test(newValue)) {
      setInputValue(newValue);
      
      const numValue = parseInt(newValue, 10);
      
      // Apply min/max constraints if needed
      if (!isNaN(numValue)) {
        if (min !== undefined && numValue < min) {
          onChange(min);
        } else if (max !== undefined && numValue > max) {
          onChange(max);
        } else {
          onChange(newValue); // Pass the string value to maintain consistency
        }
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder || (min !== undefined ? `Минимум: ${min}` : undefined)}
        className="w-full"
      />
      {help && <p className="text-sm text-gray-500 mt-1">{help}</p>}
    </div>
  );
};
