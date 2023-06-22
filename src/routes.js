import { Navigate, useLocation, useNavigate, useRoutes } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AddProductPage from './pages/AddProductPage';
import ProdcutDetailPage from './pages/ProductDetailPage';
import axios from './services/axios';

// ----------------------------------------------------------------------

export default function Router() {
  // const jwtObject = useSelector((state) => state.jwt.object);
  const location = useLocation();
  
  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products/all', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'products/add', element: <AddProductPage /> },
        { path: 'products/:id', element: <ProdcutDetailPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
