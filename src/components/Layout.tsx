import { ReactNode } from "react";
import NavBar from "./NavBar";

const Layout = ({ children }: { children: ReactNode }) => (
  <div>
    <NavBar />

    {children}
  </div>
);

export default Layout;
