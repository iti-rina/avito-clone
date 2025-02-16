import { FC } from 'react';
import { InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { InputLabel } from './InutLabel';
import { Controller, useFormContext } from 'react-hook-form';
import { ValidationError } from './ValidationError';

const propertyTypes = [
  { key: 'apartment', value: 'Квартира' },
  { key: 'room', value: 'Комната' },
  { key: 'house', value: 'Дом, дача, коттедж' },
  { key: 'land', value: 'Земельный участок' },
  { key: 'garage', value: 'Гараж и машиноместо' },
  { key: 'commercial', value: 'Коммерческая недвижимость' },
  { key: 'abroad', value: 'Недвижимость за рубежом' },
  { key: 'hotel', value: 'Отель' }
];

export const RealEstateFields: FC = () => {
  const { t } = useTranslation(['createItemForm']);
  const {
    formState: { errors },
    control
  } = useFormContext();

  return (
    <>
      <InputField>
        <InputLabel text={`${t('labelPropertyType')}`} isRequired />
        <Controller
          name='propertyType'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: '100%' }}
              size='large'
              options={propertyTypes.map((type) => ({
                value: type.value,
                label: `${t(`propertyType.${type.key}`)}`
              }))}
            />
          )}
        />
        {errors.propertyType && (
          <ValidationError errorText={String(errors.propertyType.message)} />
        )}
      </InputField>

      <OneLineBlock>
        <InputField>
          <InputLabel text={t('labelArea')} isRequired />
          <Controller
            name='area'
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                addonAfter={t('areaSuffix')}
                size='large'
                max={100000000000}
                min={0}
              />
            )}
          />
          {errors.area && (
            <ValidationError errorText={String(errors.area.message)} />
          )}
        </InputField>

        <InputField style={{ flexGrow: '1' }}>
          <InputLabel text={t('labelRooms')} isRequired />
          <Controller
            name='rooms'
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                style={{ width: '100%' }}
                size='large'
                min={1}
                max={50}
              />
            )}
          />
          {errors.rooms && (
            <ValidationError errorText={String(errors.rooms.message)} />
          )}
        </InputField>
      </OneLineBlock>

      <InputField style={{ width: '33%' }}>
        <InputLabel text={t('labelPrice')} isRequired />
        <Controller
          name='price'
          control={control}
          render={({ field }) => (
            <InputNumber {...field} addonAfter='₽' size='large' min={0} />
          )}
        />
        {errors.price && (
          <ValidationError errorText={String(errors.price.message)} />
        )}
      </InputField>
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
