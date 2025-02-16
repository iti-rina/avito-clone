import { Navigate } from 'react-router-dom';
import { RouteParams, RoutesList } from './types';
import { CreateItemForm } from '@features/create-item/ui/CreateItemForm';
import { ItemsListPage } from '@pages/items-list/ItemsListPage';
import { ItemPage } from '@pages/item/ItemPage';

export const routes: RouteParams[] = [
  {
    path: RoutesList.RootPage,
    element: <Navigate to={RoutesList.List} replace />
  },
  {
    path: RoutesList.List,
    element: <ItemsListPage />
  },
  {
    path: RoutesList.Item,
    element: <ItemPage />
  },
  {
    path: RoutesList.Form,
    element: <CreateItemForm />
  }
];
