import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RealTimeChart() {
  return (
    <Card className="hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Analytics Dashboard
            </h3>
            <p className="text-gray-400 text-sm">
              Real-time charts and analytics will be displayed here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}