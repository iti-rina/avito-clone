import * as yup from 'yup';
import type {
  Item,
  RealEstateItem,
  AutoItem,
  ServicesItem
} from '@shared/types/common';

export const validationSchemas = {
  base: yup.object<Item>({
    name: yup
      .string()
      .required('Введите название')
      .min(3, 'Не менее 3 сиволов')
      .max(100, 'Не более 100 сиволов'),
    description: yup
      .string()
      .required('Введите описание')
      .min(3, 'Не менее 3 сиволов')
      .max(100, 'Не более 500 сиволов'),
    location: yup
      .string()
      .required('Введите город')
      .min(3, 'Не менее 2 сиволов')
      .max(100, 'Не более 50 сиволов'),
    type: yup.string().required('Необходимо выбрать категорию')
  }),
  realEstate: yup.object<Partial<RealEstateItem>>({
    propertyType: yup.string().required('Необходимо выбрать тип недвижимости'),
    area: yup.number().required('Введите общую площадь'),
    rooms: yup.number().required('Укажите количество комнат'),
    price: yup.number().required('Введите цену')
  }),
  auto: yup.object<Partial<AutoItem>>({
    brand: yup.string().required('Выберите марку автомобиля'),
    model: yup
      .string()
      .required('Введите марку автомобиля')
      .max(100, 'Не более 100 символов'),
    year: yup
      .number()
      .required('Введите год выпуска')
      .min(1900, 'Минимальный год - 1900'),
    mileage: yup
      .number()
      .required('Укажите пробег')
      .max(1000000, 'Не более 1000000')
  }),
  services: yup.object<Partial<ServicesItem>>({
    serviceType: yup.string().required('Выберите тип услуги'),
    experience: yup.string().required('Укажите опыт работы'),
    cost: yup.string().required('Введите стоимость услуги')
  })
} as const;
