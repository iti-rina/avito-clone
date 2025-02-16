const express = require('express');
const cors = require('cors');
const db = require('./db.json');

// const initialItems = JSON.parse(db);

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
  let { page = 1, limit = 5, category = '', search = '' } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  let filteredByCategory = [];
  if (category !== 'all') {
    filteredByCategory = items.filter(
      (item) => item.type === ItemTypes[category]
    );
  } else {
    filteredByCategory = items;
  }

  let filteredBySearch = [];
  if (search !== '') {
    filteredBySearch = filteredByCategory.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredBySearch = filteredByCategory;
  }

  let paginatedItems = filteredBySearch.slice(startIndex, endIndex);

  res.set({
    'X-Total-Count': filteredBySearch.length,
    'X-Total-Pages': Math.ceil(filteredBySearch.length / limit),
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

//Обновление объявления по его id
app.put('/items/:id', (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id, 10));

  if (index === -1) return res.status(404).send('Item not found');

  const item = items[index];

  if (item.type === req.body.type) {
    Object.assign(item, req.body);
    return res.json(item);
  }

  items[index] = { ...req.body, id: index };
  res.json(item[index]);
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
