import { Radio } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { CarOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons';
import { Controller, useFormContext } from 'react-hook-form';
import { ValidationError } from './ValidationError';

const RadioButton = Radio.Button;

export const CategorySelect: FC = () => {
  const { t } = useTranslation('createItemForm');
  const {
    formState: { errors },
    control
  } = useFormContext();

  return (
    <>
      <Controller
        name='type'
        control={control}
        render={({ field }) => (
          <Radio.Group
            style={{ display: 'flex', gap: '10px', border: 'none' }}
            optionType='button'
            {...field}
          >
            <Option value='Недвижимость'>
              <InnerContent>
                <HomeOutlined style={{ fontSize: '24px' }} />
                {t('realEstateCategory')}
              </InnerContent>
            </Option>

            <Option value='Авто'>
              <InnerContent>
                <CarOutlined style={{ fontSize: '24px' }} />
                {t('autoCategory')}
              </InnerContent>
            </Option>

            <Option value='Услуги'>
              <InnerContent>
                <ToolOutlined style={{ fontSize: '24px' }} />
                {t('servicesCategory')}
              </InnerContent>
            </Option>
          </Radio.Group>
        )}
      />
      {errors.type && (
        <ValidationError errorText={String(errors.type.message)} />
      )}
    </>
  );
};

const Option = styled(RadioButton)`
  height: 80px;
  width: 156px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  line-height: 157%;
`;
