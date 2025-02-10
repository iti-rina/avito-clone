import { ReactElement } from 'react';
import { LoaderFunction } from 'react-router-dom';

export enum RoutesList {
  RootPage = '/',
  List = 'list',
  Item = 'item/:id',
  Form = 'form'
}

export type RouteParams = {
  path: RoutesList;
  element: ReactElement;
  errorElement?: ReactElement;
  children?: RouteParams[];
  loader?: LoaderFunction;
};
