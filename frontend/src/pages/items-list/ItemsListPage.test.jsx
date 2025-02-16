import { render, screen, waitFor } from '@testing-library/react';
import { ItemsListPage } from './ItemsListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';
import { useGetItems } from '@features/api/itemsService';

const mockData = [
  {
    id: 0,
    name: 'Продам Lexus',
    description: 'Автомобиль в отличном состоянии, без ДТП, один владелец.',
    location: 'Ростов-на-Дону',
    type: 'Авто',
    brand: 'Lexus',
    model: 'Модель 7',
    year: 2023,
    mileage: 74232,
    price: 2418334
  }
];

vi.mock('@features/api/itemsService', () => ({
  useGetItems: vi.fn()
}));

const createTestQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

describe('ItemsListPage', () => {
  it('должен вызывать useGetItems с корректными параметрами', async () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <BrowserRouter>
          <ItemsListPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(useGetItems).toHaveBeenCalledWith({
        page: 1,
        limit: 5,
        category: 'all',
        search: ''
      });
    });
  });

  it('должен рендерить объявление', async () => {
    useGetItems.mockReturnValue({
      data: { data: mockData, total: 1, totalPages: 1, currentPage: 1 }, // ✅ Оборачиваем в `data`
      isLoading: false,
      isError: false
    });

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <BrowserRouter>
          <ItemsListPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Продам Lexus')).toBeInTheDocument();
    });
  });
});
