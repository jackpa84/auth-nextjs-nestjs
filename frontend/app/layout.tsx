import './globals.css';
import ReactQueryProvider from '@/providers/react-query-provider';

export const metadata = {
  title: 'Modern Dashboard',
  description: 'Modern dashboard with dark theme',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}