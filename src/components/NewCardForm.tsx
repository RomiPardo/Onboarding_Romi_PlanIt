import { toast } from "react-toastify";
import { api } from "~/utils/api";
import InputWithLabel from "./InputWithLabel";
import Button from "./Button";
import { useState } from "react";
import router, { useRouter } from "next/router";

const NewCardForm = () => {
  const [number, setNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const { asPath } = useRouter();

  const addCardMutation = api.user.addCard.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    async onSuccess() {
      await router.replace(asPath);
    },
  });

  const addCard = () => {
    addCardMutation.mutate({ number, cvv });
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

      <Button type="submit" action={addCard}>
        Agregar Tarjeta
      </Button>
    </div>
  );
};

export default NewCardForm;
