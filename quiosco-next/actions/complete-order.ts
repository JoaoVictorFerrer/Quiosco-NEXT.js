"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

//siempre es mejor mantenter las acciones separas ya que puede utilizar tanto en el servidor como en el cliente proporcionado una mayor escalabilidad y performance
export async function completOrder(formdata : FormData) {
 

    const data = {
        orderId: formdata.get("order_id")
    }

    const result = OrderIdSchema.safeParse(data)

    if(!result.success) {
        console.log('errores en la validacion de zod en Accions')
    }else{

        try {
            await prisma.order.update({
                where: {
                    id: result.data?.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })
            //con el revalidatepath consigo actualizar los datos despues de una accion. 
            revalidatePath('admin/orders')
        } catch (error) {
            console.log(error)
        }
    }

}