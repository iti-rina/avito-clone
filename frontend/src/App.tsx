import { withProviders } from '@app/providers';
import { routes } from '@app/routes/routes';
import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';

const App: FC = () => {
  const router = createBrowserRouter(routes);

  return (
    <AppWrapper>
      <RouterProvider router={router}></RouterProvider>
    </AppWrapper>
  );
};

export const AppWithProviders = withProviders(App);

const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 1316px;
`;
