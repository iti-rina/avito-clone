import { List, Skeleton } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

export const ItemPreviewSkeleton: FC = () => {
  return (
    <List.Item>
      <ItemContent>
        <Skeleton.Image style={{ width: '271px', height: '186px' }} active />
        <Skeleton active />
      </ItemContent>
    </List.Item>
  );
};

const ItemContent = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;
`;
