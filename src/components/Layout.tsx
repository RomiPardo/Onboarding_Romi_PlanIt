import { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex h-screen flex-col">
    <NavBar />

    <div className="mt-[152px] flex-grow bg-light-gray">{children}</div>

    <Footer />
  </div>
);

export default Layout;
