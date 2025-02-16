import {
  fetchItems,
  fetchItemById,
  createItem,
  editItem,
  useGetItemById
} from './itemsService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { apiClient } from '@shared/api/apiClient';

vi.mock('@shared/api/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn()
  }
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });

describe('API функции', () => {
  it('fetchItems возвращает корректные данные', async () => {
    apiClient.get.mockResolvedValueOnce({
      data: [{ id: 1, name: 'Продам Lexus' }],
      headers: new Map([
        ['X-Total-Count', '10'],
        ['X-Total-Pages', '2'],
        ['X-Current-Page', '1']
      ])
    });

    const result = await fetchItems(1, 5, 'auto', 'Lexus');

    expect(result).toEqual({
      data: [{ id: 1, name: 'Продам Lexus' }],
      total: '10',
      totalPages: '2',
      currentPage: '1'
    });

    expect(apiClient.get).toHaveBeenCalledWith('/items', {
      params: { page: 1, limit: 5, category: 'auto', search: 'Lexus' },
      signal: undefined
    });
  });

  it('fetchItemById получает объявление', async () => {
    apiClient.get.mockResolvedValueOnce({
      data: { id: 1, name: 'Продам Lexus' }
    });

    const result = await fetchItemById('1', new AbortController().signal);

    expect(result).toEqual({ id: 1, name: 'Продам Lexus' });
    expect(apiClient.get).toHaveBeenCalledWith('/items/1', {
      signal: expect.anything()
    });
  });

  it('createItem создаёт объявление', async () => {
    apiClient.post.mockResolvedValueOnce({
      data: { id: 1, name: 'Продам Lexus' }
    });

    const result = await createItem({ name: 'Продам Lexus' });

    expect(result).toEqual({ id: 1, name: 'Продам Lexus' });
    expect(apiClient.post).toHaveBeenCalledWith('/items', {
      name: 'Продам Lexus'
    });
  });

  it('editItem изменяет объявление', async () => {
    apiClient.put.mockResolvedValueOnce({
      data: { id: 1, name: 'Обновленный Lexus' }
    });

    const result = await editItem({
      id: '1',
      itemData: { name: 'Обновленный Lexus' }
    });

    expect(result).toEqual({ id: 1, name: 'Обновленный Lexus' });
    expect(apiClient.put).toHaveBeenCalledWith('/items/1', {
      name: 'Обновленный Lexus'
    });
  });
});

describe('useGetItemById', () => {
  it('должен загружать данные по ID', async () => {
    apiClient.get.mockResolvedValueOnce({
      data: { id: '1', name: 'Продам Lexus' }
    });

    const queryClient = createTestQueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(
      () => useGetItemById({ id: '1', isEnabled: true }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual({ id: '1', name: 'Продам Lexus' });
    });

    expect(apiClient.get).toHaveBeenCalledWith('/items/1', {
      signal: expect.anything()
    });
  });

  it('должен обрабатывать ошибки', async () => {
    apiClient.get.mockRejectedValueOnce(new Error('Ошибка запроса'));

    const queryClient = createTestQueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(
      () => useGetItemById({ id: '1', isEnabled: true }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(apiClient.get).toHaveBeenCalledWith('/items/1', {
      signal: expect.anything()
    });
  });
});
