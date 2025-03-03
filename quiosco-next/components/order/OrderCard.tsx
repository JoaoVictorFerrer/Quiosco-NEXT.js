import { completOrder } from "@/actions/complete-order"
import { OrderWithProducts } from "@/src/types/indext"
import { formatCurrency } from "@/src/utils"

type OrderCardProsp = {
    order: OrderWithProducts
}

export default function OrderCard({ order }: OrderCardProsp) {

    // const CompletOrder = async () => {
    //     //tengo que especificar a mi funcion que es del servidor apesar de que mi component sigue siendo del servidor 
    //     // por lo que si mi componente es del client tengo que crear um action fuera y consumirlo 
    //     //pero como este componente es el del servidor puedo usar el actiona aqui mismo pero siempre iniciando com la flag 'use server'
    //     "use server"
    //     console.log('desde completOrder')
    // }

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900'>Cliente:  {order.name} </p>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados: {}</p>
            <dl className="mt-6 space-y-4">
                
                {order.orderProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-2 border-t border-gray-200 pt-4">
                        <dt className="flex items-center text-sm text-gray-600">
                            <span className="font-black">({product.quantity})</span>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                            {product.product.name}
                        </dd>
                    </div>
                ))}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar: {formatCurrency(order.total)}</dt>
                    <dd className="text-base font-medium text-gray-900">{}</dd>
                </div>
            </dl>

            <form action={completOrder}>
                <input type="hidden" value={order.id} name="order_id" />
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}