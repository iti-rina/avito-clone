import { Badge } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

type InputLabelProps = {
  isRequired?: boolean;
  text: string;
};
export const InputLabel: FC<InputLabelProps> = ({ isRequired, text }) => {
  return (
    <Label>
      <LabelText>{text}</LabelText>
      {isRequired ? <Badge color='#FF2D55' /> : null}
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const LabelText = styled.span`
  font-size: 16px;
  line-height: 137%;
`;
