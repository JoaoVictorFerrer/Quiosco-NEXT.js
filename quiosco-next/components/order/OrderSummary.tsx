"use client";
// todo lo que tenga 'use client sera renderizado en el cliente hasta los componentes que estan dentro de el'
import { useStore } from "@/src/store";
import ProductDetail from "./ProductDetail";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schemas";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state)=> state.clearOrder)
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order
    };
    const result = OrderSchema.safeParse(data)
  
    if (!result.success) {
      result.error.issues.forEach((issues) => {
        toast.error(issues.message);
      });
      return;
    }

    const response = await createOrder(data); // esperar la respuesta del Action(server) y renderizo la resapuesta en el cliente
    if (response?.errors) {
      response.errors.forEach((issues) => {
        toast.error(issues.message);
      });
    }

    toast.success('Pedido realizado Correctamente')
    clearOrder()
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl font-black text-center">Mi pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido esta vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetail key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a pagar:{" "}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input
              type="text"
              id="name"
              name="name"
              className=" py-2 w-full rounded bg-slate-200"
              placeholder="Inserte tu Nombre"
            />
            <input
              value={"Realizar pedido"}
              type="submit"
              className="py-2 rounded uppercase font-bold cursor-pointer bg-black text-white w-full text-center hover:bg-slate-800  "
            />
          </form>
        </div>
      )}
    </aside>
  );
}
