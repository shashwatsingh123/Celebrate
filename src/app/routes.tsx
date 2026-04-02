import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CustomerLoginPage } from "./pages/CustomerLoginPage";
import { VendorLoginPage } from "./pages/VendorLoginPage";
import { EventPlanningFormPage } from "./pages/EventPlanningFormPage";
import { ExploreServicesPage } from "./pages/ExploreServicesPage";
import { VendorDashboardPage } from "./pages/VendorDashboardPage";
import { CustomerDashboardPage } from "./pages/CustomerDashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/customer-login",
    Component: CustomerLoginPage,
  },
  {
    path: "/vendor-login",
    Component: VendorLoginPage,
  },
  {
    path: "/plan-event",
    Component: EventPlanningFormPage,
  },
  {
    path: "/explore/:eventType",
    Component: ExploreServicesPage,
  },
  {
    path: "/vendor-dashboard",
    Component: VendorDashboardPage,
  },
  {
    path: "/customer-dashboard",
    Component: CustomerDashboardPage,
  },
]);
