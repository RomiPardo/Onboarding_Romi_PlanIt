import { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => (
  <div>
    <NavBar />

    {children}

    <Footer />
  </div>
);

export default Layout;
