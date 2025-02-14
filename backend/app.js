const express = require('express');
const cors = require('cors');

const initialMockItems = [
  {
    id: 0,
    name: 'Продам Lexus',
    description: 'Автомобиль в отличном состоянии, без ДТП, один владелец.',
    location: 'Ростов-на-Дону',
    type: 'Авто',
    brand: 'Lexus',
    model: 'Модель 7',
    year: 2023,
    mileage: 74232,
    price: 2418334
  },
  {
    id: 1,
    name: 'Грузоперевозки по городу',
    description: 'Организация переездов, перевозка мебели и техники.',
    location: 'Челябинск',
    type: 'Услуги',
    serviceType: 'moving',
    experience: 12,
    cost: 9672,
    schedule: 'вечернее время'
  },
  {
    id: 2,
    name: 'Подготовка к ЕГЭ и ОГЭ',
    description:
      'Профессиональная помощь в подготовке к экзаменам по различным предметам.',
    location: 'Челябинск',
    type: 'Услуги',
    serviceType: 'tutoring',
    experience: 5,
    cost: 1992,
    schedule: 'вечером'
  },
  {
    id: 3,
    name: 'Чистка засоров и установка сантехники',
    description: 'Чистка труб, установка раковин, душевых кабин, унитазов.',
    location: 'Казань',
    type: 'Услуги',
    serviceType: 'plumbing',
    experience: 16,
    cost: 18390,
    schedule: 'по вызову'
  },
  {
    id: 4,
    name: 'Продается Квартира',
    description: 'Уютная квартира с отличным ремонтом и видом на город.',
    location: 'Омск',
    type: 'Недвижимость',
    propertyType: 'Квартира',
    area: 125,
    rooms: 5,
    price: 69002233
  },
  {
    id: 5,
    name: 'Продам Tesla',
    description: 'Автомобиль в отличном состоянии, без ДТП, один владелец.',
    location: 'Казань',
    type: 'Авто',
    brand: 'Tesla',
    model: 'Модель 10',
    year: 1998,
    mileage: 167607,
    price: 8870212
  },
  {
    id: 6,
    name: 'Продам Audi',
    description: 'Автомобиль в отличном состоянии, без ДТП, один владелец.',
    location: 'Екатеринбург',
    type: 'Авто',
    brand: 'Audi',
    model: 'Модель 8',
    year: 2019,
    mileage: 39911,
    price: 8160480
  },
  {
    id: 7,
    name: 'Ремонт и установка электропроводки',
    description: 'Прокладка кабелей, замена автоматов, установка освещения.',
    location: 'Казань',
    type: 'Услуги',
    serviceType: 'electrician',
    experience: 12,
    cost: 12549,
    schedule: 'по договоренности'
  },
  {
    id: 8,
    name: 'Покраска автомобилей',
    description: 'Покраска кузова, удаление сколов, восстановление после ДТП.',
    location: 'Москва',
    type: 'Услуги',
    serviceType: 'car_repair',
    experience: 11,
    cost: 13269,
    schedule: 'по договоренности'
  },
  {
    id: 9,
    name: 'Продается Отель',
    description: 'Мини-отель с постоянными клиентами и высоким доходом.',
    location: 'Москва',
    type: 'Недвижимость',
    propertyType: 'Отель',
    area: 143,
    rooms: 5,
    price: 48169252
  },
  {
    id: 10,
    name: 'Продается Квартира',
    description: 'Уютная квартира с отличным ремонтом и видом на город.',
    location: 'Челябинск',
    type: 'Недвижимость',
    propertyType: 'Квартира',
    area: 172,
    rooms: 2,
    price: 4756846
  },
  {
    id: 11,
    name: 'Продам Tesla',
    description: 'Автомобиль в отличном состоянии, без ДТП, один владелец.',
    location: 'Омск',
    type: 'Авто',
    brand: 'Tesla',
    model: 'Модель 4',
    year: 2012,
    mileage: 40255,
    price: 1754549
  },
  {
    id: 12,
    name: 'Разработка логотипов и фирменного стиля',
    description: 'Создание уникального брендинга, фирменных шрифтов и цветов.',
    location: 'Москва',
    type: 'Услуги',
    serviceType: 'design',
    experience: 7,
    cost: 10667,
    schedule: 'по договоренности'
  },
  {
    id: 13,
    name: 'Свадебная фотосъемка',
    description:
      'Профессиональные фото и видеосессии для свадеб, торжеств, мероприятий.',
    location: 'Екатеринбург',
    type: 'Услуги',
    serviceType: 'photo_video',
    experience: 4,
    cost: 80923,
    schedule: 'по выходным'
  },
  {
    id: 14,
    name: 'Разработка сайтов и мобильных приложений',
    description: 'Создание веб-приложений, лендингов, интернет-магазинов.',
    location: 'Омск',
    type: 'Услуги',
    serviceType: 'it_services',
    experience: 6,
    cost: 72646,
    schedule: 'по записи'
  },
  {
    id: 15,
    name: 'Доставка продуктов и медикаментов',
    description: 'Курьерская доставка необходимых товаров на дом.',
    location: 'Челябинск',
    type: 'Услуги',
    serviceType: 'delivery',
    experience: 2,
    cost: 1078,
    schedule: 'круглосуточно'
  },
  {
    id: 16,
    name: 'Продается Недвижимость за рубежом',
    description: 'Апартаменты в престижном районе с видом на море.',
    location: 'Казань',
    type: 'Недвижимость',
    propertyType: 'Недвижимость за рубежом',
    area: 75,
    rooms: 2,
    price: 49802369
  },
  {
    id: 17,
    name: 'Продам Ferrari',
    description: 'Автомобиль в отличном состоянии, без ДТП, один владелец.',
    location: 'Казань',
    type: 'Авто',
    brand: 'Ferrari',
    model: 'Модель 1',
    year: 2013,
    mileage: 135716,
    price: 9268325
  },
  {
    id: 18,
    name: 'Продам Lexus',
    description: 'Автомобиль в отличном состоянии, без ДТП, один владелец.',
    location: 'Москва',
    type: 'Авто',
    brand: 'Lexus',
    model: 'Модель 8',
    year: 2022,
    mileage: 116303,
    price: 2477099
  },
  {
    id: 19,
    name: 'Продам Ferrari',
    description: 'Автомобиль в отличном состоянии, без ДТП, один владелец.',
    location: 'Новосибирск',
    type: 'Авто',
    brand: 'Ferrari',
    model: 'Модель 6',
    year: 2002,
    mileage: 100667,
    price: 6205799
  },
  {
    id: 20,
    name: 'Продается Дом, дача, коттедж',
    description: 'Просторный дом с участком, садом и парковкой.',
    location: 'Москва',
    type: 'Недвижимость',
    propertyType: 'Дом, дача, коттедж',
    area: 188,
    rooms: 3,
    price: 31501812
  },
  {
    id: 21,
    name: 'Ремонт квартир и офисов под ключ',
    description:
      'Профессиональный ремонт любой сложности, отделка, покраска, замена полов.',
    location: 'Новосибирск',
    type: 'Услуги',
    serviceType: 'repair',
    experience: 12,
    cost: 18842,
    schedule: 'с 9:00 до 18:00'
  },
  {
    id: 22,
    name: 'Мытьё окон и фасадов',
    description:
      'Очистка окон, витрин и фасадов зданий профессиональными средствами.',
    location: 'Новосибирск',
    type: 'Услуги',
    serviceType: 'cleaning',
    experience: 9,
    cost: 4899,
    schedule: 'утренние часы'
  },
  {
    id: 23,
    name: 'Продается Дом, дача, коттедж',
    description: 'Просторный дом с участком, садом и парковкой.',
    location: 'Санкт-Петербург',
    type: 'Недвижимость',
    propertyType: 'Дом, дача, коттедж',
    area: 238,
    rooms: 1,
    price: 32231287
  },
  {
    id: 24,
    name: 'Продается Отель',
    description: 'Мини-отель с постоянными клиентами и высоким доходом.',
    location: 'Екатеринбург',
    type: 'Недвижимость',
    propertyType: 'Отель',
    area: 90,
    rooms: 6,
    price: 61607431
  },
  {
    id: 25,
    name: 'Продам Lexus',
    description: 'Автомобиль в отличном состоянии, без ДТП, один владелец.',
    location: 'Омск',
    type: 'Авто',
    brand: 'Lexus',
    model: 'Модель 5',
    year: 2006,
    mileage: 215650,
    price: 3823374
  }
];

const ItemTypes = {
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги'
};

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header(
    'Access-Control-Expose-Headers',
    'X-Total-Count, X-Total-Pages, X-Current-Page'
  );
  next();
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// In-memory хранилище для объявлений
let items = [...initialMockItems];

const makeCounter = () => {
  let count = initialMockItems.length;
  return () => count++;
};

const itemsIdCounter = makeCounter();

// Создание нового объявления
app.post('/items', (req, res) => {
  const { name, description, location, type, ...rest } = req.body;

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: 'Missing required common fields' });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Real estate' });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Auto' });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Services' });
      }
      break;
    default:
      return res.status(400).json({ error: 'Invalid type' });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get('/items', (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedItems = items.slice(startIndex, endIndex);

  res.set({
    'X-Total-Count': items.length,
    'X-Total-Pages': Math.ceil(items.length / limit),
    'X-Current-Page': page
  });

  res.json(paginatedItems);
});

// Получение объявления по его id
app.get('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Обновление объявления по его id
app.put('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Удаление объявления по его id
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
