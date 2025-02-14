import { useGetItems } from '@features/api/itemsService';
import { ItemPreview } from '@widgets/item-preview/ItemPreview';
import { List } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export const ItemsListPage: FC = () => {
  const { data, isError, isLoading } = useGetItems();

  return (
    <PageWrapper>
      <StyledList>
        {data &&
          data.map((item, index: number) => (
            <ItemPreview item={item} id={item.id ? item.id : index} />
          ))}
      </StyledList>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  padding-left: 48px;
`;

const StyledList = styled(List)`
  .ant-list-item {
    justify-content: flex-start !important;
  }
`;
