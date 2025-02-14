import { useGetItems } from '@features/api/itemsService';
import { ItemPreviewSkeleton } from '@shared/ui/ItemPreviewSkeleton';
import { ItemPreview } from '@widgets/item-preview/ItemPreview';
import { List, Pagination, Result, Select } from 'antd';
import { FC, useState } from 'react';
import styled from 'styled-components';

export const ItemsListPage: FC = () => {
  const [page, setCurrentPage] = useState(1);
  const limit = 5;

  const [category, setCategory] = useState('all');
  const handleCategoryChange = (value: string) => {
    setCurrentPage(1);
    setCategory(value);
  };

  const { data, isError, isLoading } = useGetItems({ page, limit, category });

  const loaders = Array.from(Array(5).keys()).map((item) => (
    <ItemPreviewSkeleton key={`${item}-skeleton`} />
  ));

  return (
    <>
      <PageWrapper>
        <Select
          defaultValue={category}
          style={{ width: '250px' }}
          options={[
            { value: 'all', label: 'Все' },
            { value: 'REAL_ESTATE', label: 'Недвижимость' },
            { value: 'AUTO', label: 'Авто' },
            { value: 'SERVICES', label: 'Услуги' }
          ]}
          onChange={handleCategoryChange}
        />
        <StyledList>
          {data && (
            <>
              {data.data.map((item, index: number) => (
                <ItemPreview item={item} id={item.id ? item.id : index} />
              ))}
              <Pagination
                defaultCurrent={1}
                total={data.total}
                pageSize={limit}
                current={page}
                onChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
          {isLoading && loaders}
        </StyledList>
      </PageWrapper>
      {isError && (
        <Result status='500' title='Не удалось загрузить объявления' />
      )}
    </>
  );
};

const PageWrapper = styled.div`
  padding-left: 48px;
`;

const StyledList = styled(List)`
  .ant-list-item {
    justify-content: flex-start !important;
  }
  width: 928px;
`;
