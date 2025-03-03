import { Order, OrderProducts, Producto } from "@prisma/client";

export type OrdenItem = Pick<Producto, 'id' | 'name' | 'price' > & {
    quantity: number,
    subtotal: number
}

// este type lo tnego que crear ya que nlos que prisma me genera no me satisface a la necesidade y complejidad de los datos que tengo que consumir en OrderCard
export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Producto
    })[]
}