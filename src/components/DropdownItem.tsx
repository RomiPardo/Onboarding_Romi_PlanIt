import { DropdownItem } from "@nextui-org/react";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ReactNode } from "react";

const dropdownItemStyles = cva("", {
  variants: {
    intent: {
      primary: "border-b border-black pb-2",
      secondary: "border-b-[1.5px] border-black pb-4",
      tertiary: "border-b border-black pb-2 text-[#7D7D7D]",
      forth: "pb-2 text-[#7D7D7D]",
      defaultVariants: {
        intent: "primary",
      },
    },
  },
});

interface DropdownItemProps extends VariantProps<typeof dropdownItemStyles> {
  route: string;
  linkText: string;
  children?: ReactNode;
  action?: () => Promise<void>;
}

const DropDownItem = ({
  intent,
  route,
  linkText,
  children = undefined,
  action,
  ...props
}: DropdownItemProps) => (
  <DropdownItem className={dropdownItemStyles({ intent })} onClick={action}>
    {children === undefined ? <Link href={route}>{linkText}</Link> : children}
  </DropdownItem>
);

export default DropDownItem;
