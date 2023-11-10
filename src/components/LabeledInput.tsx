import Input from "~/components/Input";

interface LabelInputProps {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  intent?: "primary" | "secondary";
}

const LabeledInput: React.FC<LabelInputProps> = ({
  type,
  id,
  placeholder,
  errorMessage,
  value,
  label,
  intent,
}) => (
  <div>
    <label className="text-xs font-normal">{label}</label>

    <Input
      type={type}
      value={value}
      id={id}
      errorMessage={errorMessage}
      intent={intent}
      placeholder={placeholder}
    />
  </div>
);

export default LabeledInput;
