"use client";

import { useStore } from "@/src/store";
import { Producto } from "@prisma/client";


type AddProductButtonProps = {
    product: Producto
}
export default function AddProductButton({product}: AddProductButtonProps) {
    const addToOrder = useStore((state)=> state.addToOrder)
  return (
    <button className=" bg-indigo-600 hover:bg-indigo-800 text-white uppercase mt-5 p-3 font-bold w-full" onClick={()=>addToOrder(product)}>
      Agregar
    </button>
  );
}
