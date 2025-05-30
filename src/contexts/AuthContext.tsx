
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  iin: string | null;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { fullName: string, iin: string, phone: string, email: string, password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileAttempted, setProfileAttempted] = useState(false);

  useEffect(() => {
    // Установка слушателя для изменений аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Сбрасываем флаг попытки загрузки профиля при изменении состояния аутентификации
        setProfileAttempted(false);

        // Если есть пользователь, получаем его профиль
        if (currentSession?.user) {
          // Используем setTimeout для предотвращения блокировки
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Проверяем наличие существующей сессии
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Getting existing session:", currentSession ? "found" : "none");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        setTimeout(() => {
          fetchUserProfile(currentSession.user.id);
        }, 0);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for ID:", userId);
      setIsLoading(true);

      try {
        // Использование нашей специальной функции безопасности для избежания рекурсии
        const { data: functionData, error: functionError } = await supabase
          .rpc('get_user_role', { user_id: userId });
        
        if (functionError) {
          console.error('Ошибка при получении роли пользователя:', functionError);
          throw functionError;
        }
        
        const role = functionData || 'user';
        console.log('User role from database:', role);
          
        // Получаем данные пользователя из auth метаданных
        const { data: userData } = await supabase.auth.getUser();
        
        if (!userData || !userData.user) {
          console.error('Не удалось получить данные пользователя');
          setIsLoading(false);
          setProfileAttempted(true);
          return;
        }
        
        // Создаем профиль из auth данных
        const email = userData.user.email || '';
        const fullName = userData.user.user_metadata?.full_name || email.split('@')[0] || 'Пользователь';
        
        console.log("Creating profile with data:", {
          userId,
          email,
          fullName,
          role
        });
        
        // Устанавливаем профиль используя доступные данные
        const userProfile = {
          id: userId,
          fullName: fullName,
          email: email,
          phone: userData.user.user_metadata?.phone || null,
          iin: userData.user.user_metadata?.iin || null,
          role: role as 'user' | 'admin'
        };
        
        setProfile(userProfile);
        console.log('Profile set successfully:', userProfile);
        
        setProfileAttempted(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при получении роли пользователя:', error);
        
        // Фолбэк на базовый профиль с демо ролью админа
        if (user?.email === 'demo@example.com') {
          // Для демо пользователя, создаем профиль админа
          const adminProfile = {
            id: userId,
            fullName: 'Иван Иван Иван', 
            email: 'demo@example.com',
            phone: null,
            iin: null,
            role: 'admin' as 'user' | 'admin'
          };
          setProfile(adminProfile);
          console.log('Set demo admin profile:', adminProfile);
        } else {
          // Для других пользователей создаем обычный профиль пользователя
          const userProfile = {
            id: userId,
            fullName: user?.user_metadata?.full_name || 'Пользователь',
            email: user?.email || '',
            phone: user?.user_metadata?.phone || null,
            iin: user?.user_metadata?.iin || null,
            role: 'user' as 'user' | 'admin'
          };
          setProfile(userProfile);
          console.log('Set fallback user profile:', userProfile);
        }
        
        setProfileAttempted(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Неожиданная ошибка при получении профиля:', error);
      setIsLoading(false);
      setProfileAttempted(true);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error in auth context:', error);
        throw error;
      }
      
      // Успешный вход, но не возвращаем data, так как тип функции Promise<void>
      console.log('Login successful');
    } catch (error: any) {
      console.error('Login error caught in auth context:', error);
      toast.error(error.message || 'Ошибка при входе');
      throw error;
    }
  };

  const register = async (userData: { fullName: string, iin: string, phone: string, email: string, password: string }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
            iin: userData.iin,
            phone: userData.phone,
          }
        }
      });

      if (error) {
        throw error;
      }
      
      toast.success('Регистрация успешна!');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка при регистрации');
      throw error;
    } finally {
      // Не устанавливаем setIsLoading(false) здесь, так как это будет сделано в onAuthStateChange
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setProfile(null);
      toast.success('Вы успешно вышли из системы');
    } catch (error: any) {
      toast.error(error.message || 'Ошибка при выходе');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      session,
      isAuthenticated: !!user,
      isLoading,
      login, 
      register,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
