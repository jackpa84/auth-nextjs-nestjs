'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      console.log('🔐 Iniciando login...', credentials);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('📡 Resposta do servidor:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro na resposta:', errorText);
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Login bem-sucedido:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('💾 Salvando tokens e dados do usuário...');
      
      // Salva os tokens E os dados do usuário
      AuthService.setTokens(data.accessToken, data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Atualiza o cache do React Query
      queryClient.setQueryData(['user'], data.user);
      queryClient.setQueryData(['auth-user'], data.user);
      
      console.log('👤 Dados do usuário salvos:', data.user);
      console.log('🔄 Redirecionando para dashboard...');
      
      // Força o redirecionamento
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);
    },
    onError: (error: any) => {
      console.error('❌ Erro no login:', error);
    },
  });

  // Query PRINCIPAL para verificar autenticação - mais robusta
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      console.log('🔍 Verificando autenticação...');
      
      // PRIMEIRO: Tenta pegar do localStorage (mais rápido)
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        console.log('📦 Usuário encontrado no cache:', JSON.parse(cachedUser));
        return JSON.parse(cachedUser);
      }

      // SEGUNDO: Se não tem cache, verifica com a API
      const token = AuthService.getAccessToken();
      console.log('📄 Token encontrado:', !!token);
      
      if (!token) {
        console.log('❌ Nenhum token encontrado');
        return null;
      }

      try {
        console.log('👤 Buscando perfil do usuário da API...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('📡 Status do perfil:', response.status);
        
        if (!response.ok) {
          throw new Error(`Profile failed: ${response.status}`);
        }

        const userData = await response.json();
        console.log('✅ Perfil carregado da API:', userData);
        
        // Salva no localStorage para próxima vez
        localStorage.setItem('user', JSON.stringify(userData));
        
        return userData;
      } catch (error) {
        console.error('❌ Erro ao carregar perfil:', error);
        AuthService.clearTokens();
        localStorage.removeItem('user');
        return null;
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const refreshToken = AuthService.getRefreshToken();
      if (refreshToken) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    },
    onSuccess: () => {
      console.log('🚪 Fazendo logout...');
      AuthService.clearTokens();
      queryClient.clear();
      localStorage.clear();
      router.replace('/login');
    },
  });

  return {
    user: user || null,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || isLoadingUser,
    isAuthenticated: !!user,
  };
};