import { Menu } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ReactNode } from "react";

const itemDropdownStyles = cva("", {
  variants: {
    intent: {
      primary: "border-b border-black py-2 text-sm font-light leading-5 w-full",
      secondary:
        "border-b-2 border-black py-2 text-sm font-light leading-5 w-full",
      tertiary:
        "border-b border-black py-2 text-[#7D7D7D] text-sm font-light leading-5  w-full",
      forth: "py-2 text-[#7D7D7D] text-sm font-light leading-5 w-full",
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
}: ItemDropdownProps) => (
  <Menu.Item>
    {({ active }) =>
      children === undefined ? (
        <div className={itemDropdownStyles({ intent })}>
          <Link
            href={route}
            onClick={action}
            className={`${active ? "text-blue-300" : "text-black"} `}
          >
            {linkText}
          </Link>
        </div>
      ) : (
        <div
          onClick={action}
          className={`${
            active ? "text-blue-300" : "text-black"
          } ${itemDropdownStyles({ intent })}`}
        >
          {children}
        </div>
      )
    }
  </Menu.Item>
);

export default ItemDropdown;
