"use client";
import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types/indext";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function OrdersPageReady() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data); 
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: false,
  });
  if (isLoading) return <p>Cargando...</p>;
  if (error) return toast.error(error);
    return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black">
          {" "}
          Ordenes Listas
        </h1>
        
        <Logo />

        {data?.length ? (
            <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10 ">
                {data.map(order => (
                     <LatestOrderItem key= {order.id} order={order}/>
                     ))}
            </div>

        ) : <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-lg font-bold">No hay Ordenes Listas</p> 
        </div> }
      </>
    );
}
