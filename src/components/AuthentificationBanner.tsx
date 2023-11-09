import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

const AuthentificationBanner = ({ children }: { children: ReactNode }) => {
  const [rotation, setRotation] = useState("0deg");

  const updateRotation = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 1249) {
      const maxScreen = 1249;
      const minScreen = 393;
      const minRotation = 0;
      const maxRotation = 10.82;
      const rotationAngle =
        screenWidth < 366
          ? 0
          : ((screenWidth - minScreen) / (maxScreen - minScreen)) *
              (minRotation - maxRotation) +
            maxRotation;

      setRotation(rotationAngle + "deg");
    } else {
      setRotation("0deg");
    }
  };

  useEffect(() => {
    updateRotation();
    window.addEventListener("resize", updateRotation);
    return () => {
      window.removeEventListener("resize", updateRotation);
    };
  }, []);

  return (
    <main className="flex w-full flex-col md:flex-row">
      <div className="hidden w-6/12 flex-col bg-gradient-to-br from-blue-300 to-blue-500 md:flex">
        <div className="flex flex-col px-32 pb-32 pt-28">
          <div>
            <Image
              alt="logo"
              src="/registerPage/logoSecondary.png"
              width={160}
              height={52}
            />
          </div>

          <div className="w-4/5 py-10 leading-10">
            <h3 className="text-5xl font-semibold text-white">
              Comienza a simplificar tus acciones,{" "}
              <span className="text-blue-300">aquí.</span>
            </h3>
          </div>

          <div>
            <h6 className="w-11/12 text-xl font-normal leading-5 text-white">
              En nuestra plataforma web vas a encontrar todo lo que estás
              buscando.
            </h6>
          </div>
        </div>

        <div className="relative">
          <Image
            className="relative"
            src="/registerPage/macBookPro16.png"
            alt="computer"
            width={644}
            height={407}
          />
          <Image
            alt="planit page in mac book"
            className="pr-17 absolute top-8"
            src="/registerPage/design.png"
            width={642}
            height={373}
          />
        </div>
      </div>

      <div className="relative flex h-44 overflow-hidden md:hidden">
        <div
          className="w-5/4 absolute -left-16 -top-48 h-80 flex-shrink-0 rounded-3xl bg-gradient-to-br from-blue-300 to-blue-500"
          style={{ transform: `rotate(${rotation})` }}
        />

        <div className="relative flex w-full justify-between px-5 pt-12">
          <div>
            <Image
              alt="logo"
              src="/registerPage/logoSecondary.png"
              width={104}
              height={33}
            />
          </div>

          <div>
            <Image
              alt="menu option"
              src="/registerPage/menu.png"
              width={42}
              height={24}
            />
          </div>
        </div>
      </div>

      {children}
    </main>
  );
};

export default AuthentificationBanner;
