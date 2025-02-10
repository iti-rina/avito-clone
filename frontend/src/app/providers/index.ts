import { withQuery } from './withQuery';

const providers = [withQuery];

export const withProviders = (Component: React.FC) => {
  return providers.reduce(
    (PrevComponent, provider) => provider(PrevComponent),
    Component
  );
};
