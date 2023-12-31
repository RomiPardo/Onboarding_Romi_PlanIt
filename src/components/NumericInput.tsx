import { useState } from "react";

type NumericInputProps = {
  onClick: (sum: number) => void;
  amount: number;
};

const NumericInput = ({ onClick, amount }: NumericInputProps) => {
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
            onClick(-1);
          }
        }}
        disabled={amount === 0}
      >
        -
      </button>

      <p className="w-12 text-center">{amount}</p>

      <button
        className="border-l border-gray px-2"
        onClick={() => {
          onClick(1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default NumericInput;
