import { withProviders } from '@app/providers';
import { routes } from '@app/routes/routes';
import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App: FC = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}></RouterProvider>;
};

export const AppWithProviders = withProviders(App);
