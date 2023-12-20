import { Cross1Icon } from "@radix-ui/react-icons";

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <div
    className="flex items-center justify-center rounded-full border border-gray hover:cursor-pointer"
    onClick={onClick}
  >
    <Cross1Icon />
  </div>
);

export default CloseButton;
