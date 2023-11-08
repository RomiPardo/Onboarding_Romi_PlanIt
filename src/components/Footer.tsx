import Image from "next/image";

const Footer = () => (
  <footer className="bg-light-gray pb-5">
    <div className="hidden flex-col px-32 text-base font-light leading-5 text-[#7D7D7D] sm:flex">
      <hr className="my-2 w-full" />

      <div className="flex w-full flex-grow flex-row items-center justify-between">
        <p>Copyright ©2021</p>

        <div className="flex flex-row items-center gap-x-2">
          <p>Powered by </p>

          <Image
            className="h-5"
            src="/footer/eagerworks.png"
            alt="eagerworks logo"
          />
        </div>

        <div className="flex flex-row gap-x-5">
          <Image className="h-6" src="/footer/linkedin.png" alt="linkedin" />
          <Image className="h-6" src="/footer/instagram.png" alt="instagram" />
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-y-12 px-5 pb-8 sm:hidden">
      <div>
        <Image
          className="h-8"
          src="/registerPage/logoSecondaryDark.png"
          alt="logo"
        />
      </div>

      <div className="flex w-full flex-col items-center justify-between text-xs font-normal leading-normal text-dark-gray">
        <div className="flex w-full flex-grow flex-row items-center justify-between">
          <p className="m-0 ">info@planit.com.uy</p>
          <p className="m-0">Tel: +598 96593615</p>
        </div>

        <hr className="my-2 w-full" />

        <div className="flex w-full flex-grow flex-row items-center justify-between">
          <div className="">
            <p className="m-0">PlanIT, 2021 - All rights reserved</p>
          </div>

          <div className="flex flex-row gap-x-5">
            <Image
              className="h-3"
              src="/registerPage/facebook.png"
              alt="facebook"
            />
            <Image
              className="h-3"
              src="/registerPage/linkedin.png"
              alt="linkedin"
            />
            <Image
              className="h-3"
              src="/registerPage/twitter.png"
              alt="twitter"
            />
            <Image
              className="h-3"
              src="/registerPage/instagram.png"
              alt="instagram"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
