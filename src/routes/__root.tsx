import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/nav/NavBar";
import RegisterModal from "@/modal/RegisterModal";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <RegisterModal />
      <Toaster />

      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  ),
});
