import { Typography } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

type TitleProps = {
  text: string;
};

export const Title: FC<TitleProps> = ({ text }) => {
  return <CustomHeading level={1}>{text}</CustomHeading>;
};

const CustomHeading = styled(Typography.Title)`
  margin-top: 0;
`;
