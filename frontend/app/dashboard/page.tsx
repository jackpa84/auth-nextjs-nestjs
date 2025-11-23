// frontend/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { RequireAuth } from '@/components/auth/require-auth';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { RealTimeChart } from '@/components/dashboard/real-time-chart';
import { Button } from '@/components/ui/button';

function DashboardContent() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [userName, setUserName] = useState('Carregando...');

  useEffect(() => {
    console.log('📊 Dashboard - Estado:', {
      user,
      isAuthenticated,
      isLoading,
      hasLocalStorageUser: !!localStorage.getItem('user')
    });

    // Atualiza o nome do usuário quando os dados estiverem disponíveis
    if (user?.name) {
      setUserName(user.name);
    } else if (user?.email) {
      setUserName(user.email);
    } else {
      // Tenta pegar do localStorage como fallback
      try {
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
          const parsedUser = JSON.parse(cachedUser);
          setUserName(parsedUser.name || parsedUser.email || 'Usuário');
        }
      } catch (error) {
        setUserName('Usuário');
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const handleRefreshUser = () => {
    // Limpa o cache para forçar recarregamento
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-gray-600">
                Bem-vindo, <strong>{userName}</strong>!
              </p>
              {(!user?.name && !user?.email) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefreshUser}
                >
                  Recarregar dados
                </Button>
              )}
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </div>

        {/* Debug info - remover em produção */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
          <strong>Debug Info:</strong>
          <div>Usuário: {user ? JSON.stringify(user) : 'null'}</div>
          <div>Autenticado: {isAuthenticated ? 'Sim' : 'Não'}</div>
          <div>Carregando: {isLoading ? 'Sim' : 'Não'}</div>
        </div>

        {/* Conteúdo do dashboard */}
        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RealTimeChart />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  );
}