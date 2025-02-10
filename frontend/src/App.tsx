import { routes } from '@app/routes/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const App = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router}></RouterProvider>;
};
