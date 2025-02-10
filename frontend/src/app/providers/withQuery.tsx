import { queryClient } from '@app/config/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export const withQuery = (Component: React.FC) => () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
};
