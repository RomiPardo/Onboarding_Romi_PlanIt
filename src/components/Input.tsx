import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";

const inputStyles = cva("", {
  variants: {
    intent: {
      primary:
        "focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-[black] pb-2 placeholder:border-transparent placeholder:text-base placeholder-font-medium placeholder-leading-normal placeholder-text-[black] focus:outline-none md:pb-3 md:placeholder-text-lg md:placeholder-font-normal md:placeholder-leading-5 bg-transparent",
      secondary:
        "focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-gray pb-2 focus:outline-none mb:pb-3 placeholder:text-gray  text-black leading-normal text-base font-medium bg-transparent",
      textarea:
        "focus:!important focus:outline-none text-black placeholder:text-gray leading-normal text-base font-medium bg-white text-sm font-light leading-4 pl-3 h-16 rounded",
      noStyle: "",
    },
    defaultVariants: {
      intent: "primary",
    },
  },
});

export type InputProps = VariantProps<typeof inputStyles> &
  InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, intent, ...props }, ref) => (
    <input
      className={inputStyles({ intent })}
      {...props}
      type={type}
      ref={ref}
    />
  ),
);

Input.displayName = "Input";
export default Input;
