import { Navigate } from 'react-router-dom';
import { RouteParams, RoutesList } from './types';
import { CreateItemForm } from '@features/create-item/ui/CreateAdForm';

export const routes: RouteParams[] = [
  {
    path: RoutesList.RootPage,
    element: <Navigate to={RoutesList.List} replace />
  },
  {
    path: RoutesList.List,
    element: <div>List</div>
  },
  {
    path: RoutesList.Item,
    element: <div>Item</div>
  },
  {
    path: RoutesList.Form,
    element: <CreateItemForm />
  }
];
