import { Link } from "@tanstack/react-router";

import Container from "../Component";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <nav className="sticky w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row justify-between gap-3 items-center md:gap-0">
            <Link to="/">
              <img
                src="/Images/logo.png"
                alt="logo"
                className="hidden md:block cursor-pointer w-20"
              />
            </Link>
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
