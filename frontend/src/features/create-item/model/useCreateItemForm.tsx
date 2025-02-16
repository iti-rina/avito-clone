import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemas } from './validation';
import {
  useCreateItem,
  useEditItem,
  useGetItemById
} from '@features/api/itemsService';
import { RoutesList } from '@app/routes/types';
import { getAllowedFields } from '@shared/utils/getAllowedFields';
import { getStepFromType } from '../lib/getStepFromType';
import { AutoItem, RealEstateItem, ServicesItem } from '@shared/types/common';

const STORAGE_KEY = 'createItemDraft';

export const useCreateItemForm = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: getItemData } = useGetItemById({
    id: id ?? '',
    isEnabled: isEdit
  });

  const { mutate, isError } = useCreateItem();
  const { mutate: editMutate } = useEditItem();

  const [step, setStep] = useState<'base' | 'realEstate' | 'auto' | 'services'>(
    'base'
  );

  const methods = useForm({
    resolver: yupResolver(
      validationSchemas[step as keyof typeof validationSchemas]
    ),
    mode: 'onChange'
  });

  const { getValues, trigger, reset, setValue } = methods;

  useEffect(() => {
    if (!isEdit) {
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        try {
          const draftData = JSON.parse(savedDraft);
          Object.entries(draftData).forEach(([key, value]) =>
            setValue(key, value)
          );
        } catch (error) {
          console.error('Ошибка при загрузке черновика:', error);
        }
      }
    }
  }, [isEdit, setValue]);

  useEffect(() => {
    if (getItemData) {
      Object.entries(getItemData).forEach(([key, value]) =>
        setValue(key, value)
      );
    }
  }, [getItemData, setValue]);

  const saveDraft = () => {
    if (isEdit) return;
    const formData = getValues();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    navigate(RoutesList.List);
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      const type = getValues('type');
      setStep(getStepFromType(type));
    }
  };

  const handleBackToBase = () => {
    const currentValues = getValues();
    reset({
      name: currentValues.name,
      description: currentValues.description,
      location: currentValues.location,
      type: currentValues.type
    });
    setStep('base');
  };

  const handleCreate = (data: RealEstateItem | AutoItem | ServicesItem) => {
    mutate(data, {
      onSuccess: () => {
        localStorage.removeItem(STORAGE_KEY);
        setSuccess(true);
        setTimeout(() => navigate(RoutesList.List), 3000);
      },
      onError: console.error
    });
  };

  const handleEdit = (data: RealEstateItem | AutoItem | ServicesItem) => {
    const allowedFields = getAllowedFields(data.type);
    const filteredData = Object.keys(data)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});

    editMutate(
      { id, itemData: filteredData },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => navigate(RoutesList.List), 3000);
        },
        onError: console.error
      }
    );
  };

  const clearForm = () => {
    if (isEdit) return;
    reset();
    localStorage.removeItem(STORAGE_KEY);
  };

  const closeForm = () => {
    clearForm();
    navigate(RoutesList.List);
  };
  const onSubmit = (data: RealEstateItem | AutoItem | ServicesItem) =>
    isEdit ? handleEdit(data) : handleCreate(data);

  return {
    success,
    isError,
    step,
    setStep,
    handleNext,
    handleBackToBase,
    methods,
    isEdit,
    onSubmit,
    saveDraft,
    closeForm
  };
};
