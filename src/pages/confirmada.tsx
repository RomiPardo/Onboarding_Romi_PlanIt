import Layout from "~/components/Layout";
import Image from "next/image";
import Button from "~/components/Button";
import Link from "next/link";

const OrderComplete = () => (
  <Layout>
    <main className="flex h-full w-full flex-col items-center justify-center px-5 pb-36 pt-28 text-center font-poppins sm:px-32 sm:pb-24 sm:pt-24">
      <Image
        className="pb-14 sm:pb-2"
        src="/service/logoPlanIt.png"
        width={225}
        height={122}
        alt="Logo PlanIt"
      />

      <h4 className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text pb-5 text-2xl font-medium leading-8 text-transparent sm:pb-4 sm:text-4xl sm:leading-9">
        Pedido realizado
      </h4>

      <h6 className="w-52 pb-14 text-xs font-normal leading-normal sm:w-80 sm:text-xl sm:leading-5">
        Te enviaremos una notificación una vez que el servicio esté confirmado.
      </h6>

      <Link className="hidden w-56 sm:block" href={"/"}>
        <Button intent="terciary">VOLVER AL INICIO</Button>
      </Link>

      <Link className="block w-56 sm:hidden" href={"/"}>
        <Button intent="secondary">VOLVER AL INICIO</Button>
      </Link>
    </main>
  </Layout>
);

export default OrderComplete;
