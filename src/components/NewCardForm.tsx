import { toast } from "react-toastify";
import { api } from "~/utils/api";
import InputWithLabel from "./InputWithLabel";
import Button from "./Button";
import { useState } from "react";
import router, { useRouter } from "next/router";
import { TRPCClientError } from "@trpc/client";

const NewCardForm = () => {
  const [number, setNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const addCardMutation = api.user.addCard.useMutation();

  const addCard = async () => {
    try {
      await addCardMutation.mutateAsync({ number, cvv });

      router.reload();
    } catch (error) {
      error instanceof TRPCClientError
        ? toast.error(error?.message)
        : toast.error("Sucedio un error inesperado");
    }
  };

  return (
    <div className="flex flex-col gap-y-4 pt-8">
      <InputWithLabel
        intent="secondary"
        type="text"
        placeholder="Numero de tarjeta"
        onChange={(e) => setNumber(e.target.value)}
      />

      <InputWithLabel
        type="text"
        placeholder="CVV"
        intent="secondary"
        onChange={(e) => setCvv(e.target.value)}
      />

      <Button onClick={addCard} type="button">
        Agregar Tarjeta
      </Button>
    </div>
  );
};

export default NewCardForm;
