import { Result, Button } from 'antd';

export const ErrorMessage = () => (
  <Result
    status='warning'
    title='Что-то пошло не так...'
    subTitle='К сожалению, объявление не было создано. Попробуйте ещё раз позже или обратитесь в службу поддержки.'
    extra={[
      <Button type='primary' key='console'>
        Go Console
      </Button>,
      <Button key='buy'>Buy Again</Button>
    ]}
  />
);
