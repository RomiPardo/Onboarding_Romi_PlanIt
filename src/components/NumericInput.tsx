import { useState } from "react";

type NumericInputProps = {
  action: (sum: number) => void;
  amount: number;
};

const NumericInput = ({ action, amount }: NumericInputProps) => {
  return (
    <div className="flex h-7 w-24 flex-row items-center rounded border border-gray">
      <button
        className={
          amount !== 0
            ? "border-r border-gray px-2"
            : "border-r border-gray px-2 text-gray"
        }
        onClick={() => {
          if (amount !== 0) {
            action(-1);
          }
        }}
      >
        -
      </button>

      <p className="w-12 text-center">{amount}</p>

      <button
        className="border-l border-gray px-2"
        onClick={() => {
          action(1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default NumericInput;
