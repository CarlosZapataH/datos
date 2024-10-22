import React from "react";
import Login from "@src/pages/login";
import Dashboard from "../components/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@src/routes/protectedRoute.jsx";
import PolicyEditPage from "@src/pages/policies/PolicyEditPage";
import PolicyListPage from "@src/pages/policies/PolicyListPage";
import ErrorPage from "../components/global/ErrorPage/ErrorPage";
import PolicyCreatePage from "@src/pages/policies/PolicyCreatePage";
import PolicyDetailPage from "@src/pages/policies/PolicyDetailPage";
import PolicyPublicPage from "@src/pages/guest/policy/PolicyPublicPage";
import UserPermissionsPage from "@src/pages/user/UserPermissionsPage";
// import ErrorPage from '@src/components/global/ErrorPage/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/:policyPath",
    element: <PolicyPublicPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/policies",
        element: <PolicyListPage />,
      },
      {
        path: "/dashboard/policies/create",
        element: <PolicyCreatePage />,
      },
      {
        path: "/dashboard/policies/:policyId",
        element: <PolicyDetailPage />,
      },
      {
        path: "/dashboard/policies/:policyId/edit",
        element: <PolicyEditPage />,
      },
      {
        path: "/dashboard/user/permissions",
        element: <UserPermissionsPage />,
      },
    ],
  },

  // {
  // 	path: '/',
  // 	element: <Root />,
  // },
]);

export default router;
