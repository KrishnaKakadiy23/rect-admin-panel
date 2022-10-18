import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import  Edituser  from './sections/@dashboard/user/Edituser';
import Tour from './sections/@dashboard/tour/Tour';
import ViewTour from './sections/@dashboard/tour/ViewTour';

// ----------------------------------------------------------------------
// { path: 'user/adduser', element: <AddnewUser /> },


export default function Router() {
  return useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
  

    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'tour', element: <Tour />},
        {path: 'view/:_id' , element: <ViewTour />},
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
  {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
