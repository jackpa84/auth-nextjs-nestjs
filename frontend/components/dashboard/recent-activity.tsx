import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const activities = [
  {
    user: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    action: 'placed an order',
    time: '15 min ago',
    amount: '$1,999.00'
  },
  {
    user: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    action: 'subscribed to premium',
    time: '30 min ago',
    amount: '$39.00'
  },
  {
    user: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    action: 'cancelled subscription',
    time: '45 min ago',
    amount: '$299.00'
  },
  {
    user: 'William Kim',
    email: 'will@email.com',
    action: 'made a payment',
    time: '1 hour ago',
    amount: '$99.00'
  },
  {
    user: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    action: 'created an account',
    time: '2 hours ago',
    amount: '$0.00'
  }
];

export function RecentActivity() {
  return (
    <Card className="hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700/30 transition-colors duration-200">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {activity.user.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {activity.user}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {activity.action}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {activity.amount}
                </p>
                <p className="text-xs text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}