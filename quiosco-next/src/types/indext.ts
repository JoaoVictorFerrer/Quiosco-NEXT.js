import { Producto } from "@prisma/client";

export type OrdenItem = Pick<Producto, 'id' | 'name' | 'price' > & {
    quantity: number,
    subtotal: number
}