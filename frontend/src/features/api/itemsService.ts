import { apiClient } from '@shared/api/apiClient';
import {
  AutoAd,
  EditAdParams,
  RealEstateAd,
  ServicesAd
} from '@shared/types/common';
import { useMutation, useQuery } from '@tanstack/react-query';

const fetchItems = async () => {
  const { data } = await apiClient.get('/items');
  return data;
};

const fetchItemById = async (id: string) => {
  const { data } = await apiClient.get(`/items/${id}`);
  return data;
};

const createItem = async (adData: RealEstateAd | AutoAd | ServicesAd) => {
  const { data } = await apiClient.post('/items', adData);
  return data;
};

const editItem = async ({ id, adData }: EditAdParams) => {
  const { data } = await apiClient.put(`/items/${id}`, adData);
  return data;
};

export const useGetItems = () => {
  return useQuery({ queryKey: ['items'], queryFn: fetchItems });
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
