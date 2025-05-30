
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserType, UserFormValues, userFormSchema, EditUserFormValues, editUserFormSchema } from './types';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UserFormProps {
  isLoading: boolean;
  isEditing: boolean;
  selectedUser: UserType | null;
  onSubmit: (data: UserFormValues | EditUserFormValues) => Promise<void>;
  onCancel: () => void;
  language: string;
}

export const UserForm: React.FC<UserFormProps> = ({ 
  isLoading, 
  isEditing, 
  selectedUser, 
  onSubmit,
  onCancel,
  language 
}) => {
  // Initialize form with react-hook-form
  const form = useForm<UserFormValues | EditUserFormValues>({
    resolver: zodResolver(isEditing ? editUserFormSchema : userFormSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      password: '',
      role: 'user'
    },
  });

  // Reset form with selected user data when it changes
  useEffect(() => {
    if (isEditing && selectedUser) {
      form.reset({
        full_name: selectedUser.full_name,
        email: selectedUser.email,
        phone: selectedUser.phone || '',
        role: selectedUser.role
      });
    } else if (!isEditing) {
      form.reset({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'user'
      });
    }
  }, [selectedUser, isEditing, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'ru' ? 'ФИО' : 'Аты-жөні'}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'ru' ? 'Телефон' : 'Телефон'}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isEditing 
                  ? (language === 'ru' ? 'Новый пароль' : 'Жаңа құпия сөз')
                  : (language === 'ru' ? 'Пароль' : 'Құпия сөз')
                }
              </FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  {...field} 
                  placeholder={isEditing ? (language === 'ru' ? 'Оставьте пустым, чтобы не менять' : 'Өзгерту үшін бос қалдырыңыз') : ''} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === 'ru' ? 'Роль' : 'Рөлі'}</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="user">{language === 'ru' ? 'Пользователь' : 'Пайдаланушы'}</option>
                  <option value="admin">{language === 'ru' ? 'Администратор' : 'Әкімші'}</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            type="button"
            disabled={isLoading}
          >
            {language === 'ru' ? 'Отмена' : 'Болдырмау'}
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-r-transparent border-white rounded-full animate-spin mr-2"></div>
                {language === 'ru' ? 'Сохранение...' : 'Жүктеу...'}
              </div>
            ) : (
              language === 'ru' ? 'Сохранить' : 'Сақтау'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
