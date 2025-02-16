export const getStepFromType = (
  type: string
): 'base' | 'realEstate' | 'auto' | 'services' => {
  switch (type) {
    case 'Недвижимость':
      return 'realEstate';
    case 'Авто':
      return 'auto';
    case 'Услуги':
      return 'services';
    default:
      return 'base';
  }
};
