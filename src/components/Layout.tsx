import { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { VariantProps, cva } from "class-variance-authority";
import Toast from "./Toast";

const navBarStyles = cva("", {
  variants: {
    intent: {
      primary: "",
      goBack: "hidden sm:flex",
    },
    defaultVariants: {
      intent: "primary",
    },
  },
});

type LayoutProps = VariantProps<typeof navBarStyles> & {
  children: ReactNode;
  onClick?: (() => Promise<void>) | (() => void);
};

const Layout = ({ intent, children, onClick, ...props }: LayoutProps) => (
  <div className="flex h-screen flex-col">
    <Toast />

    <div className={navBarStyles({ intent })}>
      <NavBar onClick={onClick} />
    </div>

    <div
      className={
        intent === "primary"
          ? "mt-[152px] flex-grow bg-light-gray"
          : "flex-grow bg-light-gray sm:mt-[152px]"
      }
    >
      {children}
    </div>

    <Footer />
  </div>
);

export default Layout;
