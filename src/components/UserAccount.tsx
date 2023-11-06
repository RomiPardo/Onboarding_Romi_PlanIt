import { Dropdown, DropdownTrigger } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import DropdownUser from "./DropdownUser";

const UserAccount = () => {
  const session = useSession();
  const imageLink = session.data?.user.image
    ? session.data?.user.image
    : "/userImage/default.png";

  return (
    <div className="flex items-center gap-x-3">
      <img className="h-10 w-10 rounded-3xl" src={imageLink} />

      <div className="flex flex-col">
        <div className="flex gap-x-2 text-lg font-medium leading-5">
          <p>{session.data?.user.name}</p>

          <p>{session.data?.user.lastName}</p>
        </div>

        <Dropdown>
          <DropdownTrigger>
            <div className="flex flex-row items-center gap-x-1 text-base font-normal leading-4 text-[#7D7D7D]">
              <span className="hover:cursor-pointer">
                {session.data?.user.role}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
              >
                <path
                  d="M7 0.5H2L4.5 3.5L7 0.5Z"
                  fill="#7D7D7D"
                  stroke="#7D7D7D"
                />
              </svg>
            </div>
          </DropdownTrigger>

          <DropdownUser version="user" />
        </Dropdown>
      </div>
    </div>
  );
};

export default UserAccount;
