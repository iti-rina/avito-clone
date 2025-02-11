type Category = 'Недвижимость' | 'Авто' | 'Услуги';

type Ad = {
  name: string;
  description: string;
  location: string;
  type: Category;
  photo?: unknown;
};

export type RealEstateAd = {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
} & Ad;

export type AutoAd = {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
} & Ad;

export type ServicesAd = {
  serviceType: string;
  experience: number;
  cost: number;
  schedule?: string;
} & Ad;

export type EditAdParams = {
  id: string;
  adData: RealEstateAd | AutoAd | ServicesAd;
};
