"use client"
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import useSWR from "swr";
import { OrderWithProducts } from "@/src/types/indext";
import { toast } from "react-toastify";



// //actualizar de manera manual el panel-admin de ordes
// const refreshOrders = async () =>{
//   "use server"
//   revalidatePath('/admin/orders')
// }

export default  function OrdersPage() {
  
  // voy a utilizar SWR para darle un comportamiento en tiempo real epro si estar com muchas consultas seguidas (swr solo se puede utilziar en el client)
  
  const url = "/admin/orders/api"
  const fetcher = ()=> fetch(url).then(res => res.json()).then(data => data) // utilizo fetch para no respaldamer en axios o otra dependencia 
  const {data,error,isLoading} =useSWR<OrderWithProducts[]>(url,fetcher,{
    refreshInterval: 30000, // se tendria que realizar peticiones mas seguidos pero se consumiria muchos datos de la base de datos FREE
    revalidateOnFocus:false
  })
  if(isLoading) return <p>Cargando...</p>
  if(error) return toast.error(error)
  if(data) return (
    <>
      <Heading>Administrador de Ordenes</Heading>
      {/* <form action={refreshOrders }>
        <input type="submit" value={"Actualizar Ordenes"} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"/>
      </form> */}
      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5 ">
          {data.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">

          <p className="text-center">No hay Ordenes pendientes</p>
        </div>
      )}
    </>
  );
}
