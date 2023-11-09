import { useSession } from "next-auth/react";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import DropdownArrow from "./DropdownArrow";
import { Menu } from "@headlessui/react";

const UserAccount = () => {
  const session = useSession();
  const imageLink = session.data?.user.image
    ? session.data?.user.image
    : "/userImage/default.png";

  return (
    <div className="flex items-center gap-x-3">
      <Image
        className="rounded-3xl"
        src={imageLink}
        alt="user profile photo"
        width={40}
        height={40}
      />

      <div className="flex flex-col">
        <div className="flex gap-x-2 text-lg font-medium leading-5">
          <p>{session.data?.user.name}</p>

          <p>{session.data?.user.lastName}</p>
        </div>

        <Menu as="div">
          <Menu.Button>
            <div className="flex flex-row items-center gap-x-1 text-base font-normal leading-4 text-[#7D7D7D]">
              <span className="hover:cursor-pointer">
                {session.data?.user.role}
              </span>

              <DropdownArrow />
            </div>
          </Menu.Button>

          <DropdownUser />
        </Menu>
      </div>
    </div>
  );
};

export default UserAccount;
