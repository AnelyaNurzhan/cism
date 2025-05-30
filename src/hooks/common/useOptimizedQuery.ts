
import React from 'react';
import { useQuery, UseQueryOptions, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

interface UseOptimizedQueryProps<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  queryKey: (string | number | boolean)[];
  queryFn: () => Promise<T>;
  dependencies?: string[];
  invalidateOnAuth?: boolean;
  onError?: (error: Error) => void;
}

export const useOptimizedQuery = <T>({
  queryKey,
  queryFn,
  dependencies = [],
  invalidateOnAuth = true,
  onError,
  ...options
}: UseOptimizedQueryProps<T>) => {
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  
  // Convert all queryKey elements to strings for consistency
  const normalizedKey = queryKey.map(key => String(key));
  
  // Automatically invalidate related queries when auth state changes
  React.useEffect(() => {
    if (invalidateOnAuth && dependencies.length > 0) {
      dependencies.forEach(dep => {
        queryClient.invalidateQueries({ queryKey: [dep] });
      });
    }
  }, [isAuthenticated, user?.id, queryClient, dependencies, invalidateOnAuth]);

  const result = useQuery({
    queryKey: normalizedKey,
    queryFn,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error?.message?.includes('auth') || error?.message?.includes('unauthorized')) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options
  });

  // Handle errors using the modern approach
  React.useEffect(() => {
    if (result.error && onError) {
      onError(result.error as Error);
    }
  }, [result.error, onError]);

  return result;
};
