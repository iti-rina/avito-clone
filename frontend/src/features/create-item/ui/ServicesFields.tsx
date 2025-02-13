import { FC } from 'react';
import { Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { InputLabel } from './InutLabel';
import { Controller, useFormContext } from 'react-hook-form';
import { ValidationError } from './ValidationError';

const servicesList = [
  'repair',
  'cleaning',
  'delivery',
  'moving',
  'babysitting',
  'tutoring',
  'plumbing',
  'electrician',
  'car_repair',
  'design',
  'photo_video',
  'it_services',
  'beauty',
  'fitness',
  'legal'
];

export const ServicesFields: FC = () => {
  const { t } = useTranslation(['createItemForm']);

  const {
    formState: { errors },
    control
  } = useFormContext();

  return (
    <>
      <InputField>
        <InputLabel text={t('labelServiceType')} isRequired />
        <Controller
          name='serviceType'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: '100%', borderRadius: '2px' }}
              options={servicesList.map((service) => ({
                value: service,
                label: t(`services.${service}`)
              }))}
              size='large'
            />
          )}
        />
        {errors.serviceType && (
          <ValidationError errorText={String(errors.serviceType.message)} />
        )}
      </InputField>

      <InputField>
        <InputLabel text={t('labelExperience')} isRequired />
        <Controller
          name='experience'
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              size='large'
              max={99}
              min={0}
              addonAfter={t('experienceSuffix')}
            />
          )}
        />
        {errors.experience && (
          <ValidationError errorText={String(errors.experience.message)} />
        )}
      </InputField>

      <InputField>
        <InputLabel text={t('labelCost')} isRequired />
        <Controller
          name='cost'
          control={control}
          render={({ field }) => (
            <InputNumber {...field} addonAfter='₽' size='large' min={0} />
          )}
        />
        {errors.cost && (
          <ValidationError errorText={String(errors.cost.message)} />
        )}
      </InputField>

      <InputField>
        <InputLabel text={t('labelSchedule')} />
        <Controller
          name='schedule'
          control={control}
          render={({ field }) => <Input {...field} size='large' />}
        />
        {errors.schedule && (
          <ValidationError errorText={String(errors.schedule.message)} />
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
