'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, FileText, Activity } from 'lucide-react';

interface StatsCardsProps {
  data?: {
    totalUsers: number;
    totalPosts: number;
    activeUsers: number;
    growth: number;
  };
}

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    icon: Users,
    description: '+20.1% from last month',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Total Posts',
    value: '456',
    icon: FileText,
    description: '+12.4% from last month',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Active Users',
    value: '789',
    icon: Activity,
    description: '+8.2% from last month',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    title: 'Growth',
    value: '32.5%',
    icon: TrendingUp,
    description: '+5.3% from last month',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export function StatsCards({ data }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}