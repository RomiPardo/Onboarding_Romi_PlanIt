import Layout from "~/components/Layout";
import Image from "next/image";
import Button from "~/components/Button";

const OrderComplete = () => (
  <Layout>
    <div className="flex flex-col">
      <Image src="/service/logoPlanIt.png" width={225} height={122} alt="Logo PlanIt"/>

      <h4 className="text-2xl font-medium leading-8 sm:text-4xl sm:leading-9">
        Pedido realizado
      </h4>

      <h6 className="text-xs font-normal leading-normal sm:text-xl sm:leading-5">
        Te enviaremos una notificación una vez que el servicio esté confirmado.
      </h6>

      <Button intent="secondary">VOLVER AL INICIO</Button>
    </div>
  </Layout>
);

export default OrderComplete;
