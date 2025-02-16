import { PlusOutlined } from '@ant-design/icons';
import { RoutesList } from '@app/routes/types';
import { useGetItems } from '@features/api/itemsService';
import { SearchInput } from '@features/search-by-name/Search';
import { ItemPreviewSkeleton } from '@shared/ui/ItemPreviewSkeleton';
import { ItemPreview } from '@widgets/item-preview/ItemPreview';
import { Button, List, Pagination, Result, Select, Typography } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Title } from '@features/create-item/ui/Title';

export const ItemsListPage: FC = () => {
  const navigate = useNavigate();
  const onCreateItemClick = () => {
    navigate(RoutesList.Form);
  };

  const { t } = useTranslation(['actionButton', 'createItemForm']);

  const [page, setCurrentPage] = useState(1);
  const limit = 5;

  const [category, setCategory] = useState('all');
  const handleCategoryChange = (value: string) => {
    setCurrentPage(1);
    setCategory(value);
  };

  const [search, setSearch] = useState('');

  const { data, isError, isLoading } = useGetItems({
    page,
    limit,
    category,
    search: search.toLowerCase()
  });

  const loaders = Array.from(Array(5).keys()).map((item) => (
    <ItemPreviewSkeleton key={`${item}-skeleton`} />
  ));

  let titleText = '';
  switch (category) {
    case 'all':
      titleText = 'Все объявления';
      break;
    case 'REAL_ESTATE':
      titleText = 'Недвижимость';
      break;
    case 'AUTO':
      titleText = 'Автомобили';
      break;
    case 'SERVICES':
      titleText = 'Услуги';
      break;
  }

  return (
    <>
      <PageWrapper>
        <Header style={{}}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <img src='/favicon.svg' width='40px' height='40px' />
            <Typography.Text style={{ fontSize: '26px', fontWeight: '500' }}>
              Клон Авито
            </Typography.Text>
          </div>
          <CreateItemButton
            type='primary'
            onClick={onCreateItemClick}
            size='large'
            icon={<PlusOutlined />}
          >
            {t('createItemMain')}
          </CreateItemButton>
        </Header>
        <SearchInput
          onSearch={setSearch}
          isLoading={isLoading && search !== ''}
        />

        {data && (
          <>
            <HeaderWrapper>
              <TitleWrapper>
                <Title text={titleText} />
                <ItemsNumber>{data.total}</ItemsNumber>
              </TitleWrapper>
              <Select
                defaultValue={category}
                style={{ width: '250px' }}
                options={[
                  {
                    value: 'all',
                    label: `${t('all', { ns: 'createItemForm' })}`
                  },
                  {
                    value: 'REAL_ESTATE',
                    label: `${t('realEstateCategory', {
                      ns: 'createItemForm'
                    })}`
                  },
                  {
                    value: 'AUTO',
                    label: `${t('autoCategory', { ns: 'createItemForm' })}`
                  },
                  {
                    value: 'SERVICES',
                    label: `${t('servicesCategory', { ns: 'createItemForm' })}`
                  }
                ]}
                onChange={handleCategoryChange}
              />
            </HeaderWrapper>
            <StyledList>
              {data.data.map((item) => (
                <ItemPreview item={item} key={item.id} />
              ))}
              <PaginationWrapper>
                <Pagination
                  defaultCurrent={1}
                  total={data.total}
                  pageSize={limit}
                  current={page}
                  onChange={(page) => setCurrentPage(page)}
                />
              </PaginationWrapper>
            </StyledList>
          </>
        )}

        {isLoading && <StyledList>{loaders}</StyledList>}
      </PageWrapper>
      {isError && (
        <Result status='500' title='Не удалось загрузить объявления' />
      )}
    </>
  );
};

const PageWrapper = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const CreateItemButton = styled(Button)`
  align-self: flex-end;
  box-shadow: none !important;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

const ItemsNumber = styled(Typography.Text)`
  color: rgba(0, 0, 0, 0.25);
  font-size: 38px;
  font-weight: 500;
  line-height: 191%;
`;
const StyledList = styled(List)`
  .ant-list-item {
    justify-content: flex-start !important;
  }

  @media (max-width: 769px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaginationWrapper = styled.div`
  @media (max-width: 769px) {
    margin-top: 16px;
    justify-content: center;
    display: flex;
  }
`;
