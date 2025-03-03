import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import Navbar from "@/components/nav/NavBar";
import RegisterModal from "@/modal/RegisterModal";
import LoginModal from "@/modal/LoginModal";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <RegisterModal />
      <LoginModal />

      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
