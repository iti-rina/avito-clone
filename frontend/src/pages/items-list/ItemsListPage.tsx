import { PlusOutlined } from '@ant-design/icons';
import { RoutesList } from '@app/routes/types';
import { useGetItems } from '@features/api/itemsService';
import { SearchInput } from '@features/search-by-name/Search';
import { ItemPreviewSkeleton } from '@shared/ui/ItemPreviewSkeleton';
import { ItemPreview } from '@widgets/item-preview/ItemPreview';
import { Button, List, Pagination, Result, Select } from 'antd';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

  return (
    <>
      <PageWrapper>
        <CreateItemButton
          type='primary'
          onClick={onCreateItemClick}
          size='large'
          icon={<PlusOutlined />}
        >
          {t('createItemMain')}
        </CreateItemButton>

        <SearchInput
          onSearch={setSearch}
          isLoading={isLoading && search !== ''}
        />

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
              label: `${t('realEstateCategory', { ns: 'createItemForm' })}`
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

        {data && (
          <StyledList>
            {data.data.map((item) => (
              <ItemPreview item={item} />
            ))}
            <Pagination
              defaultCurrent={1}
              total={data.total}
              pageSize={limit}
              current={page}
              onChange={(page) => setCurrentPage(page)}
              style={{ marginTop: '16px' }}
            />
          </StyledList>
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

const StyledList = styled(List)`
  .ant-list-item {
    justify-content: flex-start !important;
  }
`;
