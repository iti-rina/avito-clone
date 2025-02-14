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
  id: string;
};

export const ItemPreview: FC<ItemPreviewProps> = ({ item, id }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <List.Item>
      <Link to={`item/${id}`} style={{ width: '100%' }}>
        <ItemContent>
          {item.photo && !imgError ? (
            <Image
              width={271}
              height={186}
              src={item.photo}
              style={{
                objectFit: 'cover',
                objectPosition: 'top left',
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
    </List.Item>
  );
};

const ItemContent = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;
const MainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const TitleWithoutMarginTop = styled(Typography.Title)`
  margin-top: 0;
`;

const Divider = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: #545454;
`;
