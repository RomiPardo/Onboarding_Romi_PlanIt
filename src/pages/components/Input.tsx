interface InputProps {
  type: string;
  id: string;
  action: (value: string) => void;
  style: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  action,
  style,
  placeholder,
}) => (
  <input
    id={id}
    type={type}
    className={style}
    required
    onChange={(e) => {
      action(e.target.value);
    }}
    placeholder={placeholder}
  />
);

export default Input;
