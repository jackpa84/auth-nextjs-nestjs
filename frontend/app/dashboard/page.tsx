'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { RequireAuth } from '@/components/auth/require-auth';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { RealTimeChart } from '@/components/dashboard/real-time-chart';
import { Button } from '@/components/ui/button';

function DashboardContent() {
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState('Carregando...');

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name);
    } else if (user?.email) {
      setUserName(user.email);
    } else {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {}
        <div className="flex items-center justify-between p-6 bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2 flex items-center space-x-2">
              <span>Bem-vindo,</span>
              <strong className="text-white font-semibold">{userName}</strong>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </p>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </Button>
        </div>

        {}
        <div className="space-y-8">
          <StatsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RealTimeChart />
            <RecentActivity />
          </div>
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