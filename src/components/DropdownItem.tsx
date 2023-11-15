import { Menu } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const itemDropdownStyles = cva("", {
  variants: {
    intent: {
      primary:
        "border-b border-black py-2 text-sm font-light leading-5 w-full text-black hover:text-blue-300",
      secondary:
        "border-b-2 border-black py-2 text-sm font-light leading-5 w-full text-black hover:text-blue-300",
      tertiary:
        "border-b border-black py-2 text-[#7D7D7D] text-sm font-light leading-5 w-full hover:text-blue-300",
      forth:
        "py-2 text-[#7D7D7D] text-sm font-light leading-5 w-full hover:text-blue-300",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

type ItemDropdownProps = VariantProps<typeof itemDropdownStyles> & {
  route: string;
  linkText: string;
  children?: ReactNode;
  action?: () => Promise<void>;
};

const ItemDropdown = ({
  intent,
  route,
  linkText,
  children,
  action,
  ...props
}: ItemDropdownProps) => {
  const { asPath } = useRouter();
  const active = asPath === route;

  return (
    <Menu.Item>
      {children ? (
        <div
          onClick={action}
          className={`${active ? "text-blue-300" : ""} ${itemDropdownStyles({
            intent,
          })}`}
        >
          {children}
        </div>
      ) : (
        <div className={itemDropdownStyles({ intent })}>
          <Link
            href={route}
            onClick={action}
            className={`${active ? "text-blue-300" : ""}`}
          >
            {linkText}
          </Link>
        </div>
      )}
    </Menu.Item>
  );
};

export default ItemDropdown;
