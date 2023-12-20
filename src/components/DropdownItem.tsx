import { Menu } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useFilteringContext } from "~/hooks/useFilteringContext";

const itemDropdownStyles = cva("", {
  variants: {
    intent: {
      primary:
        "border-b border-black py-2 text-sm font-light leading-5 w-full text-black hover:text-blue-300",
      secondary:
        "border-b-2 border-black py-2 text-sm font-light leading-5 w-full text-black hover:text-blue-300",
      tertiary:
        "border-b border-black py-2 text-gray text-sm font-light leading-5 w-full hover:text-blue-300",
      forth:
        "py-2 text-gray text-sm font-light leading-5 w-full hover:text-blue-300",
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
  onClick?: () => Promise<void>;
};

const ItemDropdown = ({
  intent,
  route,
  linkText,
  children,
  onClick,
  ...props
}: ItemDropdownProps) => {
  const { asPath } = useRouter();
  const active = asPath === route;
  const { clearAll } = useFilteringContext();

  return (
    <Menu.Item>
      {children ? (
        <div
          onClick={async () => {
            if (onClick) {
              await onClick();
            }
            clearAll();
          }}
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
            onClick={async () => {
              if (onClick) {
                await onClick();
              }
              clearAll();
            }}
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
