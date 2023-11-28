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
  action?: (() => Promise<void>) | (() => void);
};

const Layout = ({ intent, children, action, ...props }: LayoutProps) => (
  <div className="flex h-screen flex-col">
    <Toast />

    <div className={navBarStyles({ intent })}>
      <NavBar action={action} />
    </div>

    {navBarStyles({ intent }) === "" ? (
      <div className="mt-[152px] flex-grow bg-light-gray">{children}</div>
    ) : (
      <div className="flex-grow bg-light-gray sm:mt-[152px]">{children}</div>
    )}

    <Footer />
  </div>
);

export default Layout;
