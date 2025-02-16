export const getAllowedFields = (type: string): string[] => {
  const baseFields = ['name', 'description', 'location', 'type', 'photo'];

  const categoryFields: Record<string, string[]> = {
    Недвижимость: ['propertyType', 'area', 'rooms', 'price'],
    Авто: ['brand', 'model', 'year', 'mileage'],
    Услуги: ['serviceType', 'experience', 'cost', 'schedule']
  };

  return [...baseFields, ...(categoryFields[type] || [])];
};
