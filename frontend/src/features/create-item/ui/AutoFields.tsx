import { FC } from 'react';
import { Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { InputLabel } from './InutLabel';
import { Controller, useFormContext } from 'react-hook-form';
import { ValidationError } from './ValidationError';
import { carBrands } from '@shared/constants/carBrands';

export const AutoFields: FC = () => {
  const { t } = useTranslation(['createItemForm']);
  const {
    formState: { errors },
    control
  } = useFormContext();

  return (
    <>
      <InputField>
        <InputLabel text={t('labelBrand')} isRequired />
        <Controller
          name='brand'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: '100%' }}
              options={carBrands.map((brand) => ({
                value: brand,
                label: brand
              }))}
              size='large'
            />
          )}
        />
        {errors.brand && (
          <ValidationError errorText={String(errors.brand.message)} />
        )}
      </InputField>

      <InputField>
        <InputLabel text={t('labelModel')} isRequired />
        <Controller
          name='model'
          control={control}
          render={({ field }) => <Input {...field} size='large' />}
        />
        {errors.model && (
          <ValidationError errorText={String(errors.model.message)} />
        )}
      </InputField>

      <OneLineBlock>
        <InputField>
          <InputLabel text={t('labelYear')} isRequired />
          <Controller
            name='year'
            control={control}
            render={({ field }) => (
              <InputNumber {...field} size='large' max={2025} addonAfter='г.' />
            )}
          />
          {errors.year && (
            <ValidationError errorText={String(errors.year.message)} />
          )}
        </InputField>

        <InputField style={{ flexGrow: '1' }}>
          <InputLabel text={t('labelMileage')} isRequired />
          <Controller
            name='mileage'
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                addonAfter={t('mileageSuffix')}
                size='large'
                min={0}
              />
            )}
          />
          {errors.mileage && (
            <ValidationError errorText={String(errors.mileage.message)} />
          )}
        </InputField>
      </OneLineBlock>
    </>
  );
};

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OneLineBlock = styled.div`
  display: flex;
  gap: 24px;
`;
