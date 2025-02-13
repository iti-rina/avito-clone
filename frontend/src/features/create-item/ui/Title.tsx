import { FC } from 'react';
import styled from 'styled-components';

type TitleProps = {
  text: string;
};

export const Title: FC<TitleProps> = ({ text }) => {
  return <CustomHeading>{text}</CustomHeading>;
};

const CustomHeading = styled.h1`
  margin: 0;
  font-size: 38px;
  line-height: 121%;
  font-weight: 500;
`;
