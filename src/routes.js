import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/product/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AddProductPage from './pages/product/AddProductPage';
import ProdcutDetailPage from './pages/product/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';
import PromotePage from './pages/promote/PromotePage';
import BrandPage from './pages/brand/BrandPage';
import BrandDetailPage from './pages/brand/BrandDetailPage';
import AddBrandPage from './pages/brand/AddBrandPage';
import PromoteDetailPage from './pages/promote/PromoteDetailPage';
import AddPromotePage from './pages/promote/AddPromotePage';
import OrderPage from './pages/order/OrderPage';
import OrderDetailPage from './pages/order/OrderDetailPage';

// ----------------------------------------------------------------------

export default function Router() {
  // const jwtObject = useSelector((state) => state.jwt.object);

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
        { path: 'profile', element: <ProfilePage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'order/:id', element: <OrderDetailPage /> },
        { path: 'promote', element: <PromotePage /> },
        { path: 'promote/:id', element: <PromoteDetailPage />},
        { path: 'promote/add', element: <AddPromotePage />},
        { path: 'brand', element: <BrandPage /> },
        { path: 'brand/:id', element: <BrandDetailPage /> },
        { path: 'brand/add', element: <AddBrandPage />},
        { path: 'products/all', element: <ProductsPage /> },
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
