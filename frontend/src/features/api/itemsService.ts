import { apiClient } from '@shared/api/apiClient';
import {
  AutoItem,
  EditItemParams,
  RealEstateItem,
  ServicesItem
} from '@shared/types/common';
import { useMutation, useQuery } from '@tanstack/react-query';

const fetchItems = async (page: number, limit: number) => {
  const response = await apiClient.get('/items', { params: { page, limit } });
  console.log(response.headers);
  return {
    data: response.data,
    total: response.headers.get('X-Total-Count'),
    totalPages: response.headers.get('X-Total-Pages'),
    currentPage: response.headers.get('X-Current-Page')
  };
};

const fetchItemById = async (id: string) => {
  const { data } = await apiClient.get(`/items/${id}`);
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
  limit
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ['items', page],
    queryFn: () => fetchItems(page, limit)
  });
};

export const useGetItemById = (id: string) => {
  return useQuery({ queryKey: ['item', id], queryFn: () => fetchItemById(id) });
};

export const useCreateItem = () => {
  return useMutation({ mutationFn: createItem });
};

export const useEditItem = () => {
  return useMutation({ mutationFn: editItem });
};
