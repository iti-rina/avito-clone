import { Title } from './Title';
import { CloseFormButton } from './CloseFormButton';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { RealEstateFields } from './RealEstateFields';
import { AutoFields } from './AutoFields';
import { ServicesFields } from './ServicesFields';
import { FormFirstStep } from './FormFirstStep';
import { Button } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemas } from '../model/validation';
import { useCreateItem } from '@features/api/itemsService';

export const CreateItemForm: FC = () => {
  const { mutate, isLoading, isError } = useCreateItem();

  const { t } = useTranslation(['createItemForm', 'actionButton']);

  const [step, setStep] = useState<'base' | 'realEstate' | 'auto' | 'services'>(
    'base'
  );

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      switch (getValues('type')) {
        case 'Недвижимость':
          setStep('realEstate');
          break;
        case 'Авто':
          setStep('auto');
          break;
        case 'Услуги':
          setStep('services');
          break;
        default:
          setStep('base');
          break;
      }
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

  const methods = useForm({
    resolver: yupResolver(
      validationSchemas[step as keyof typeof validationSchemas]
    ),
    mode: 'onChange'
  });

  const { getValues, handleSubmit, trigger, reset } = methods;

  const onSubmit = (data) => {
    console.log(data);
    mutate(data, {
      onSuccess: (newItem) => {
        console.log('Объявление создано!', newItem);
      },
      onError: (error) => {
        console.error('Ошибка:', error);
      }
    });
  };

  return (
    <PageWrapper>
      <HeaderWrapper>
        <Title text={t('title', { ns: 'createItemForm' })} />
        <CloseFormButton onClick={() => setStep('base')} />
      </HeaderWrapper>

      <FormProvider {...methods}>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {step === 'base' && <FormFirstStep handleNext={handleNext} />}

          {step === 'realEstate' && <RealEstateFields />}
          {step === 'auto' && <AutoFields />}
          {step === 'services' && <ServicesFields />}

          {step !== 'base' && (
            <ControlWrapper>
              <Button size='large' onClick={handleBackToBase}>
                {t('back', { ns: 'actionButton' })}
              </Button>
              <Button size='large' type='primary' htmlType='submit'>
                {t('createItem', { ns: 'actionButton' })}
              </Button>
            </ControlWrapper>
          )}
        </FormWrapper>
      </FormProvider>
    </PageWrapper>
  );
};

const ControlWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 16px;
`;

const PageWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  margin-top: 20px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
