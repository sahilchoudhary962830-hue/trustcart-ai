import { LoadingPage } from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Suspense, lazy } from "react";

// Lazy-load pages
const Home = lazy(() => import("@/pages/Home"));
const ReviewAnalyzer = lazy(() => import("@/pages/ReviewAnalyzer"));
const ProductChecker = lazy(() => import("@/pages/ProductChecker"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AdminPanel = lazy(() => import("@/pages/AdminPanel"));
const TrustBadge = lazy(() => import("@/pages/TrustBadge"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const Profile = lazy(() => import("@/pages/Profile"));

function RootComponent() {
  const initialize = useAuth((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  );
}

const rootRoute = createRootRoute({ component: RootComponent });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});
const analyzerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analyzer",
  component: () => <ReviewAnalyzer />,
});
const checkerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checker",
  component: () => <ProductChecker />,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => <Dashboard />,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => <AdminPanel />,
});
const trustBadgeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/trust-badge",
  component: () => <TrustBadge />,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <Login />,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: () => <Signup />,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => <Profile />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  analyzerRoute,
  checkerRoute,
  dashboardRoute,
  adminRoute,
  trustBadgeRoute,
  loginRoute,
  signupRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
