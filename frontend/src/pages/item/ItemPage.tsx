import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { RoutesList } from '@app/routes/types';
import { useGetItemById } from '@features/api/itemsService';
import { Button, Image, Result, Skeleton, Tooltip, Typography } from 'antd';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const orderedKeys = [
  'propertyType',
  'city',
  'area',
  'rooms',
  'brand',
  'model',
  'year',
  'mileage',
  'serviceType',
  'experience',
  'schedule',
  'cost',
  'price'
];

export const ItemPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetItemById({ id: id ?? '' });

  const [imgError, setImgError] = useState(false);

  const { t, i18n } = useTranslation();

  const handleEditClick = () => {
    navigate(`/item/${id}/edit`);
  };

  const suffixes = {
    mileage: 'км',
    area: 'м2',
    price: 'руб.',
    cost: 'руб.'
  };

  return (
    <PageWrapper>
      <header style={{ display: 'flex', gap: '8px', position: 'relative' }}>
        <Button
          type='text'
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(RoutesList.List)}
          style={{ padding: '8px' }}
        />
        <Logo>
          <img src='/favicon.svg' width='40px' height='40px' />
          <Typography.Text
            style={{
              fontSize: '26px',
              fontWeight: '500'
            }}
          >
            Клон Авито
          </Typography.Text>
        </Logo>

        <EditButton title={t('editTooltip', { ns: 'actionButton' })}>
          <Button icon={<EditOutlined />} onClick={handleEditClick} />
        </EditButton>
      </header>
      <MainContentWrapper>
        {data && (
          <ItemContent>
            {data?.photo && !imgError ? (
              <ItemImage src={data.photo} onError={() => setImgError(true)} />
            ) : (
              <SkeletonImage
                style={{
                  width: '725px',
                  height: '498px',
                  borderRadius: '30px'
                }}
              />
            )}
            <div>
              <ItemTitle level={1}>{data.name}</ItemTitle>
              <ItemAditionalInfo>
                {orderedKeys
                  .filter((key) => data[key] !== undefined)
                  .map((key) => (
                    <React.Fragment key={key}>
                      <Label>
                        {t(`label${key[0].toUpperCase() + key.slice(1)}`, {
                          ns: 'createItemForm'
                        })}
                      </Label>
                      <Typography.Text>
                        {i18n.exists(`services.${data[key]}`, {
                          ns: 'createItemForm'
                        })
                          ? t(`services.${data[key]}`, {
                              ns: 'createItemForm'
                            })
                          : data[key]}{' '}
                        {suffixes[key] ? suffixes[key] : null}
                      </Typography.Text>
                    </React.Fragment>
                  ))}

                <Label>
                  {' '}
                  {t('labelDescription', {
                    ns: 'createItemForm'
                  })}
                </Label>
                <Typography.Text>{data.description}</Typography.Text>
              </ItemAditionalInfo>
            </div>
          </ItemContent>
        )}

        {isLoading && (
          <>
            <Button
              type='text'
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(RoutesList.List)}
              style={{ padding: '8px' }}
            />
            <Skeleton.Image
              style={{ width: '725px', height: '498px' }}
              active
            />
            <Skeleton active />
          </>
        )}

        {isError || !id ? (
          <Result
            status='404'
            title='404'
            subTitle={t('404', { ns: 'messages' })}
            extra={<Button type='primary'>Back Home</Button>}
          />
        ) : null}
      </MainContentWrapper>
    </PageWrapper>
  );
};

const MainContentWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 38px 0 20px;
  justify-content: center;
  position: relative;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* padding: 78px 0 20px; */
  justify-content: center;
  position: relative;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemContent = styled.div`
  display: flex;
  gap: 48px;

  @media (max-width: 767px) {
    flex-direction: column;
    overflow-x: hidden;
  }
`;

const ItemTitle = styled(Typography.Title)`
  margin-top: 0;
  margin-bottom: 26px !important;
`;

const ItemAditionalInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-row-gap: 16px;
`;

const Label = styled(Typography.Text)`
  color: #c1c1c1d9;
`;

const EditButton = styled(Tooltip)`
  position: absolute;
  top: 0;
  right: 0;
`;

const ItemImage = styled(Image)`
  width: 725px;
  height: 498px;
  object-fit: contain;
  object-position: center;
  border-radius: 30px;

  @media (max-width: 767px) {
    width: 100%;
    height: auto;
  }
`;

const SkeletonImage = styled(Skeleton.Image)`
  @media (max-width: 767px) {
    width: 100%;
    height: auto;
  }
`;
