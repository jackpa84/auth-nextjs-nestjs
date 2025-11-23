'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RealTimeChart() {
  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Gráfico em Tempo Real
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            Gráfico será implementado aqui
          </p>
        </div>
      </CardContent>
    </Card>
  );
}