'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        let errorMessage = 'Erro ao fazer login';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    },
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        AuthService.setTokens(data.accessToken, data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      queryClient.setQueryData(['user'], data.user);
      queryClient.setQueryData(['auth-user'], data.user);
      router.push('/dashboard');
    },
  });

  
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      
      if (typeof window === 'undefined') {
        return null;
      }

      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        return JSON.parse(cachedUser);
      }

      const token = AuthService.getAccessToken();
      if (!token) {
        return null;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Profile failed: ${response.status}`);
        }

        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      } catch (error) {
        AuthService.clearTokens();
        localStorage.removeItem('user');
        return null;
      }
    },
    enabled: mounted, 
    staleTime: 5 * 60 * 1000,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const refreshToken = AuthService.getRefreshToken();
      if (refreshToken) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });
        } catch (error) {
          console.error('Erro no logout:', error);
        }
      }
    },
    onSuccess: () => {
      AuthService.clearTokens();
      queryClient.clear();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      router.replace('/login');
    },
  });

  return {
    user: mounted ? (user || null) : null,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || isLoadingUser || !mounted,
    isAuthenticated: mounted && !!user && !!AuthService.getAccessToken(),
  };
};