import { DropdownItem } from "@nextui-org/react";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ReactNode } from "react";

const itemDropdownStyles = cva("", {
  variants: {
    intent: {
      primary: "border-b border-black pb-2",
      secondary: "border-b-[1.5px] border-black pb-4",
      tertiary: "border-b border-black pb-2 text-[#7D7D7D]",
      forth: "pb-2 text-[#7D7D7D]",
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
  <DropdownItem className={itemDropdownStyles({ intent })} onClick={action}>
    {children === undefined ? (
      <Link href={route}>{linkText}</Link>
    ) : (
      <div>{children}</div>
    )}
  </DropdownItem>
);

export default ItemDropdown;
