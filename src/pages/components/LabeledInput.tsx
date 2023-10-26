interface LabelInputProps {
  type: string;
  id: string;
  name: string;
  direction: "x" | "y";
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const LabeledInput: React.FC<LabelInputProps> = ({
  type,
  id,
  name,
  direction,
  label,
  onChange,
  value,
}) => (
  <div
    className={direction !== "x" ? "flex flex-col gap-y-2.5" : "flex gap-x-2.5"}
  >
    <label htmlFor={name}>{label}</label>
    <input
      id={id}
      type={type}
      name={name}
      className="text-black focus:outline-none"
      required
      onChange={onChange}
      value={value}
    />
  </div>
);

export default LabeledInput;
