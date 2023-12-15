import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const buttonStyles = cva("", {
  variants: {
    intent: {
      primary:
        "box-border h-8 w-full rounded border-0 bg-gradient-to-br from-blue-300 to-blue-500 text-center text-base font-medium leading-4 text-white shadow-sm hover:cursor-pointer md:h-9 md:text-base md:font-medium",
      secondary:
        "box-border h-8 w-full rounded border border-gray bg-wite text-center text-base font-medium leading-4 text-gray shadow-sm hover:cursor-pointer md:h-9 md:text-base md:font-medium",
      terciary:
        "box-border h-8 w-full rounded border bg-wite text-center text-base font-medium leading-4 text-black shadow-sm hover:cursor-pointer md:h-9 md:text-base md:font-medium border-black",
      help: "flex h-8 w-56 flex-row items-center justify-center gap-3 rounded-xl bg-blue-300 text-base font-normal leading-4 text-white",
      edition: "ms:text-right h-9 text-left hover:cursor-pointer",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & {
  children?: ReactNode;
  onClick?: (() => Promise<void>) | (() => void);
  type?: "button" | "submit";
};

const Button = ({
  intent,
  children,
  onClick,
  type = "submit",
  ...props
}: ButtonProps) => (
  <button
    className={buttonStyles({ intent })}
    {...props}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
