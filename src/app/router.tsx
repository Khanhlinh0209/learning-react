import { Suspense, lazy, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

import { UserLayout } from "@/shared/layouts/UserLayout";
import { AdminLayout } from "@/shared/layouts/AdminLayout";
import { ProtectedRoute } from "@/shared/components/common/ProtectedRoute";
import { GuestRoute } from "@/shared/components/common/GuestRoute";
import { UnauthorizedPage, NotFoundPage } from "@/shared/pages";

// ─── Feature pages ───────────────────────────────────────
import { HomePage } from "@/features/landing";
import { LoginPage, RegisterPage } from "@/features/auth";
import {
  RitualCatalog,
  RitualDetail,
} from "@/features/rituals";
import { ProfilePage } from "@/features/users";

const DashboardPage = lazy(() =>
  import("@/features/dashboard").then((module) => ({
    default: module.DashboardPage,
  })),
);

const ManageRitualList = lazy(() =>
  import("@/features/rituals").then((module) => ({
    default: module.ManageRitualList,
  })),
);

const ManageRitualCreate = lazy(() =>
  import("@/features/rituals").then((module) => ({
    default: module.ManageRitualCreate,
  })),
);

const ManageRitualEdit = lazy(() =>
  import("@/features/rituals").then((module) => ({
    default: module.ManageRitualEdit,
  })),
);

const UserManagementPage = lazy(() =>
  import("@/features/users").then((module) => ({
    default: module.UserManagementPage,
  })),
);

const withRouteSuspense = (element: ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

/**
 * React Router v6 config – createBrowserRouter (Data API).
 *
 * Public routes: /, /rituals, /rituals/:id, /login, /register
 * Protected (user/admin): /profile
 * Protected (admin only): /admin/*
 */
export const router = createBrowserRouter([
  // ─── Public layout (User) ───────────────────────────
  {
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "rituals", element: <RitualCatalog /> },
      { path: "rituals/:id", element: <RitualDetail /> },
      {
        path: "login",
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
      { path: "unauthorized", element: <UnauthorizedPage /> },

      // Protected: cần đăng nhập
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },

      // 404 fallback cho user layout
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // ─── Admin layout (Protected, admin only) ───────────
  {
    path: "admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: withRouteSuspense(<DashboardPage />) },
      { path: "rituals", element: withRouteSuspense(<ManageRitualList />) },
      {
        path: "rituals/create",
        element: withRouteSuspense(<ManageRitualCreate />),
      },
      {
        path: "rituals/:id/edit",
        element: withRouteSuspense(<ManageRitualEdit />),
      },
      { path: "users", element: withRouteSuspense(<UserManagementPage />) },
    ],
  },
]);
