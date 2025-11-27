import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    description: '+20.1% from last month',
    icon: '💰',
    trend: 'up'
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    description: '+180.1% from last month',
    icon: '👥',
    trend: 'up'
  },
  {
    title: 'Sales',
    value: '+12,234',
    description: '+19% from last month',
    icon: '🛒',
    trend: 'up'
  },
  {
    title: 'Active Now',
    value: '+573',
    description: '+201 since last hour',
    icon: '⚡',
    trend: 'up'
  }
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {stat.title}
            </CardTitle>
            <span className="text-2xl">{stat.icon}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1" />
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}