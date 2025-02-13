import { FC } from 'react';
import { UploadPhoto } from './UploadPhoto';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { InputLabel } from './InutLabel';
import { useTranslation } from 'react-i18next';
import { CategorySelect } from './CategorySelect';
import { Controller, useFormContext } from 'react-hook-form';
import { ValidationError } from './ValidationError';

type FormFirstStepProps = {
  handleNext: () => void;
};

export const FormFirstStep: FC<FormFirstStepProps> = ({ handleNext }) => {
  const {
    formState: { errors },
    control
  } = useFormContext();

  const { t } = useTranslation(['createItemForm', 'actionButton']);

  return (
    <>
      <InputField>
        <InputLabel text={t('category', { ns: 'createItemForm' })} isRequired />
        <CategorySelect />
      </InputField>

      <InputField>
        <InputLabel
          text={t('labelTitle', { ns: 'createItemForm' })}
          isRequired
        />
        <Controller
          name='name'
          control={control}
          render={({ field }) => <Input size='large' {...field} />}
        />

        {errors.name && (
          <ValidationError errorText={String(errors.name.message)} />
        )}
      </InputField>

      <InputField>
        <InputLabel
          text={t('labelDescription', { ns: 'createItemForm' })}
          isRequired
        />
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <Input.TextArea
              id='description'
              allowClear
              size='large'
              {...field}
            />
          )}
        />
        {errors.description && (
          <ValidationError errorText={String(errors.description.message)} />
        )}
      </InputField>

      <InputField>
        <InputLabel
          text={t('labelCity', { ns: 'createItemForm' })}
          isRequired
        />
        <Controller
          name='location'
          control={control}
          render={({ field }) => <Input size='large' {...field} />}
        />
        {errors.location && (
          <ValidationError errorText={String(errors.location.message)} />
        )}
      </InputField>

      <InputField>
        <InputLabel text={t('labelPhoto', { ns: 'createItemForm' })} />
        <UploadPhoto />
      </InputField>

      <Button
        onClick={handleNext}
        style={{ alignSelf: 'flex-end' }}
        size='large'
      >
        {t('next', { ns: 'actionButton' })}
      </Button>
    </>
  );
};

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
