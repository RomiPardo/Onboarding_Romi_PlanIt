import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const buttonStyles = cva("", {
  variants: {
    intent: {
      primary:
        "box-border h-7 w-full rounded border-0 bg-gradient-to-br from-blue-300 to-blue-500 text-center text-base font-medium leading-4 text-white shadow-sm hover:cursor-pointer md:h-9 md:text-base md:font-medium",
      help: "flex h-8 w-56 flex-row items-center justify-center gap-3 rounded-xl bg-blue-300 text-base font-normal leading-4 text-white",
    },
    defaultVariants: {
      intent: "primary",
    },
  },
});

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  text: string;
  children?: ReactNode;
}

const Button = ({ intent, children, text, ...props }: ButtonProps) => (
  <button className={buttonStyles({ intent })} {...props} type="submit">
    {children}
    {text}
  </button>
);

export default Button;
