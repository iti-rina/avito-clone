import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { FC } from 'react';

const { Text } = Typography;

type ValidationErrorProps = {
  errorText: string;
};

export const ValidationError: FC<ValidationErrorProps> = ({ errorText }) => {
  return (
    <Text type='danger'>
      <ExclamationCircleOutlined style={{ marginRight: '5px' }} />
      {errorText}
    </Text>
  );
};
