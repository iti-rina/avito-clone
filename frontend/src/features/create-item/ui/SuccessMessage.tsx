import { Result } from 'antd';

export const SuccessMessage = ({ isEdit }) => (
  <Result
    status='success'
    title={isEdit ? 'Изменения сохранены' : 'Объявление создано успешно'}
    subTitle='Перенаправляем вас на страницу объявлений'
  />
);
