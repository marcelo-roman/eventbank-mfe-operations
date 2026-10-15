import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import { ProjectionsPage } from './operations/ProjectionsPage';
import styles from './styles.css?inline';

export default function App() {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: 1 } } }));

  return (
    <QueryClientProvider client={queryClient}>
      <style>{styles}</style>
      <Routes>
        <Route index element={<ProjectionsPage />} />
      </Routes>
    </QueryClientProvider>
  );
}
