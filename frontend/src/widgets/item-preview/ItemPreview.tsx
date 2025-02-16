import { List, Skeleton, Typography, Image } from 'antd';
import { FC, useState } from 'react';
import type {
  AutoItem,
  RealEstateItem,
  ServicesItem
} from '@shared/types/common';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type ItemPreviewProps = {
  item: RealEstateItem | AutoItem | ServicesItem;
};

export const ItemPreview: FC<ItemPreviewProps> = ({ item }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Item>
      <Link to={`/item/${item.id}`} style={{ width: '100%' }}>
        <ItemContent>
          {item.photo && !imgError ? (
            <Image
              width={271}
              height={186}
              src={String(item.photo)}
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                borderRadius: '8px'
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <Skeleton.Image style={{ width: '271px', height: '186px' }} />
          )}
          <MainInfoWrapper>
            <TitleWithoutMarginTop level={3}>{item.name}</TitleWithoutMarginTop>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Typography.Text>{item.type}</Typography.Text>
              <Divider />
              <Typography.Text>{item.location}</Typography.Text>
            </div>
          </MainInfoWrapper>
        </ItemContent>
      </Link>
    </Item>
  );
};

const ItemContent = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;

  @media (max-width: 769px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Item = styled(List.Item)`
  transition: background-color 0.3s ease-in-out 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;
const MainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  @media (max-width: 769px) {
    align-items: center;
  }
`;

const TitleWithoutMarginTop = styled(Typography.Title)`
  margin-top: 0;
  @media (max-width: 769px) {
    text-align: center;
  }
`;

const Divider = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: #545454;
`;
