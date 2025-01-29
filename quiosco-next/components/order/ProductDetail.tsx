import { useStore } from "@/src/store";
import { OrdenItem } from "@/src/types/indext";
import { formatCurrency } from "@/src/utils";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useMemo } from "react";

type ProductDetailProps = {
  item: OrdenItem;
};

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

export default function ProductDetail({ item }: ProductDetailProps) {
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQauntity = useStore((state) => state.decreaseQuantity);
  const removeItem = useStore((state) => state.removeItem)
  const desableDecreaseQuantity = useMemo(() => item.quantity === MIN_ITEMS , [item]);
  const desableIncreaseQuantity = useMemo(() => item.quantity === MAX_ITEMS, [item]);
  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() =>removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg ">
          <button
            className=" disabled:opacity-20 "
            disabled={desableDecreaseQuantity}
            type="button"
            onClick={() => decreaseQauntity(item.id)}
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
            disabled={desableIncreaseQuantity}
            className=" disabled:opacity-20 "
            type="button"
            onClick={() => increaseQuantity(item.id)}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {formatCurrency(item.subtotal)}
          <span className="font-normal"></span>
        </p>
      </div>
    </div>
  );
}
