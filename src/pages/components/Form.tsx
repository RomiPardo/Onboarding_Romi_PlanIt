import { ReactNode } from "react";

const Form = ({ style, children }: { style: string; children: ReactNode }) => (
  <form className={style}>{children}</form>
);

export default Form;
