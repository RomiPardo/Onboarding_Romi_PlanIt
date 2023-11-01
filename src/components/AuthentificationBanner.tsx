import { ReactNode, useEffect, useState } from "react";

const AuthentificationBanner = ({children} : { children: ReactNode }) => {
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
            <img
              rel="logo"
              src="/registerPage/logoSecondary.png"
              className="w-40"
            />
          </div>

          <div className="w-4/5 py-10 leading-[51.84px]">
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
          <img className="relative" src="/registerPage/macBookPro16.png" />
          <img
            rel="planit page in mac book"
            className="absolute top-[2.18rem] pr-[68px]"
            src="/registerPage/design.png"
          />
        </div>
      </div>

      <div className="relative flex h-44 overflow-hidden md:hidden">
        <div
          className="absolute -left-16 -top-48 h-80 w-[125%] flex-shrink-0 rounded-3xl bg-gradient-to-br from-blue-300 to-blue-500"
          style={{ transform: `rotate(${rotation})` }}
        />

        <div className="relative flex w-full justify-between px-5 pt-12">
          <div>
            <img
              rel="logo"
              src="/registerPage/logoSecondary.png"
              className="w-24"
            />
          </div>

          <div>
            <img
              rel="menu option"
              src="/registerPage/menu.png"
              className="w-11"
            />
          </div>
        </div>
      </div>

      {children}
    </main>
  );
};

export default AuthentificationBanner;
