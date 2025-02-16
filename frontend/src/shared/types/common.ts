type Category = 'Недвижимость' | 'Авто' | 'Услуги';

export type Item = {
  id: string;
  name: string;
  description: string;
  location: string;
  type: Category;
  photo?: unknown;
};

export type RealEstateItem = {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
} & Item;

export type AutoItem = {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
} & Item;

export type ServicesItem = {
  serviceType: string;
  experience: number;
  cost: number;
  schedule?: string;
} & Item;

export type EditItemParams = {
  id: string;
  itemData: RealEstateItem | AutoItem | ServicesItem;
};
