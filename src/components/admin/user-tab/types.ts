
import { z } from 'zod';

export interface UserType {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
}

// Schema for user form validation
export const userFormSchema = z.object({
  full_name: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).optional(),
  role: z.string().refine(val => ['admin', 'user'].includes(val), {
    message: 'Role must be either admin or user',
  })
});

// Schema for edit user form validation (password is optional when editing)
export const editUserFormSchema = userFormSchema.extend({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
export type EditUserFormValues = z.infer<typeof editUserFormSchema>;
