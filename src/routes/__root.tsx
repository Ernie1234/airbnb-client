import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import Navbar from "@/components/nav/NavBar";
import RegisterModal from "@/components/modal/RegisterModal";
import LoginModal from "@/components/modal/LoginModal";
import { RentModal } from "@/components/modal/RentModal";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <RegisterModal />
      <LoginModal />
      <RentModal />
      {/* <div className="pb-20 pt-28"> */}
      <Outlet />
      {/* </div> */}
      <TanStackRouterDevtools />
    </>
  ),
});
