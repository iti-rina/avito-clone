import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';

type ButtonProps = {
  onClick: () => void;
};

export const CloseFormButton: FC<ButtonProps> = ({ onClick }) => {
  return (
    <Button
      type='text'
      size='large'
      icon={<CloseOutlined onClick={onClick} style={{ fontSize: '24px' }} />}
    />
  );
};
