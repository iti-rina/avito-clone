import { withQuery } from './withQuery';
import { withStyles } from './withStyles';

const providers = [withQuery, withStyles];

export const withProviders = (Component: React.FC) => {
  return providers.reduce(
    (PrevComponent, provider) => provider(PrevComponent),
    Component
  );
};
