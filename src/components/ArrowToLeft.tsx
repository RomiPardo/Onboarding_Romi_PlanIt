type ArrowToLeftProps = {
  color: string;
};

const ArrowToLeft = ({ color }: ArrowToLeftProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="7"
    height="11"
    viewBox="0 0 7 11"
    fill="none"
  >
    <path d="M6 0.5L1 5.5L6 10.5" stroke={color} strokeLinecap="round" />
  </svg>
);

export default ArrowToLeft;
