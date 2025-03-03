import { create } from "zustand";
import { OrdenItem } from "./types/indext";
import { Producto } from "@prisma/client";

interface Store {
  order: OrdenItem[];
  addToOrder: (product: Producto) => void;
  increaseQuantity: (id: Producto["id"]) => void;
  decreaseQuantity: (id: Producto["id"]) => void;
  removeItem: (id: Producto["id"]) => void;
  clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const productItem = {
      name: product.name,
      id: product.id,
      price: product.price,
    };

    let order: OrdenItem[] = [];
    if (get().order.find((item) => item.id === productItem.id)) {
      order = get().order.map((item) =>
        item.id === productItem.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: productItem.price * (item.quantity + 1),
            }
          : item
      );
    } else {
      order = [
        ...get().order,
        {
          ...productItem,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ];
    }
    set(() => ({
      order,
    }));
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (id) => {
  
    const order = get().order.map((item) =>item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
          }
        : item
    );
    set(()=>({
      order
    }))
  },

  removeItem: (id) => {

    set((state)=>({
        order: state.order.filter(item => item.id !== id)
    }))
  },

  clearOrder: () => {
        set(()=>({
          order: []
        }))
  }
}));
