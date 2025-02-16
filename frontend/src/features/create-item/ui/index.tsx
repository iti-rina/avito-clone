import { Title } from './Title';
import { CloseFormButton } from './CloseFormButton';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { RealEstateFields } from './RealEstateFields';
import { AutoFields } from './AutoFields';
import { ServicesFields } from './ServicesFields';
import { FormFirstStep } from './FormFirstStep';
import { Button } from 'antd';
import { FormProvider } from 'react-hook-form';
import { useCreateItemForm } from '../model/useCreateItemForm';
import { SuccessMessage } from './SuccessMessage';
import { ErrorMessage } from './ErrorMessage';

export const CreateItemForm: FC = () => {
  const { t } = useTranslation(['createItemForm', 'actionButton']);
  const {
    success,
    isError,
    step,
    handleNext,
    handleBackToBase,
    methods,
    isEdit,
    onSubmit,
    saveDraft,
    closeForm
  } = useCreateItemForm();

  if (success) return <SuccessMessage isEdit={isEdit} />;
  if (isError) return <ErrorMessage />;

  return (
    <PageWrapper>
      <ClosingButtons>
        {!isEdit && (
          <Button type='text' size='large' onClick={saveDraft}>
            {t('saveDraft', { ns: 'actionButton' })}
          </Button>
        )}
        <CloseFormButton onClick={closeForm} />
      </ClosingButtons>
      <Title text={!isEdit ? t('title') : t('editTitle')} />

      <FormProvider {...methods}>
        <FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 'base' && <FormFirstStep handleNext={handleNext} />}
          {step === 'realEstate' && <RealEstateFields />}
          {step === 'auto' && <AutoFields />}
          {step === 'services' && <ServicesFields />}

          {step !== 'base' && (
            <ControlWrapper>
              <NoShadowButton size='large' onClick={handleBackToBase}>
                {t('back', { ns: 'actionButton' })}
              </NoShadowButton>
              <NoShadowButton size='large' type='primary' htmlType='submit'>
                {!isEdit
                  ? t('createItem', { ns: 'actionButton' })
                  : t('done', { ns: 'actionButton' })}
              </NoShadowButton>
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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ClosingButtons = styled.div`
  display: flex;
  gap: 6px;
  align-self: flex-end;
`;

const NoShadowButton = styled(Button)`
  box-shadow: none !important;
`;
