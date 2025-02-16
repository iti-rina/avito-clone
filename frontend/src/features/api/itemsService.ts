import { apiClient } from '@shared/api/apiClient';
import {
  AutoItem,
  EditItemParams,
  RealEstateItem,
  ServicesItem
} from '@shared/types/common';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosHeaders } from 'axios';

type ItemsResponse = {
  data: (RealEstateItem | AutoItem | ServicesItem)[];
  total: number;
  totalPages: number;
  currentPage: number;
};

const fetchItems = async (
  page: number,
  limit: number,
  category?: string,
  search?: string,
  signal?: AbortSignal
): Promise<ItemsResponse> => {
  const response = await apiClient.get('/items', {
    params: { page, limit, category, search },
    signal
  });

  return {
    data: response.data,
    total: response.headers.get('X-Total-Count') ?? 0,
    totalPages: response.headers.get('X-Total-Pages') ?? 1,
    currentPage: response.headers.get('X-Current-Page') ?? 1
  };
};

const fetchItemById = async (id: string, signal: AbortSignal) => {
  const { data } = await apiClient.get(`/items/${id}`, { signal });
  return data;
};

const createItem = async (adData: RealEstateItem | AutoItem | ServicesItem) => {
  const { data } = await apiClient.post('/items', adData);
  return data;
};

const editItem = async ({ id, itemData }: EditItemParams) => {
  const { data } = await apiClient.put(`/items/${id}`, itemData);
  return data;
};

export const useGetItems = ({
  page,
  limit,
  category,
  search
}: {
  page: number;
  limit: number;
  category: string;
  search: string;
}) => {
  return useQuery<ItemsResponse>({
    queryKey: ['items', page, category, search],
    queryFn: ({ signal }) => fetchItems(page, limit, category, search, signal)
  });
};

export const useGetItemById = ({
  id,
  isEnabled
}: {
  id: string;
  isEnabled?: boolean;
}) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: ({ signal }) => fetchItemById(id, signal),
    enabled: isEnabled ?? true
  });
};

export const useCreateItem = () => {
  return useMutation({ mutationFn: createItem });
};

export const useEditItem = () => {
  return useMutation({ mutationFn: editItem });
};
