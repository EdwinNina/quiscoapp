import { useQuiosco } from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";
import { formatearDinero } from "helpers";
import { useCallback, useEffect } from "react";

export default function Total() {
   const { obtenerTotalPedido, totalPedido, pedido, nombre, setNombre } = useQuiosco()

   const comprobarPedido = useCallback(() => {
      return pedido.length === 0 || nombre === '' || nombre.length < 3
   }, [pedido, nombre])

   useEffect(() => {
      comprobarPedido()
      obtenerTotalPedido()
   }, [pedido, comprobarPedido])

   const handleSubmit = e => {
      e.preventDefault()
   }

   return (
      <Layout pagina='Total y Confirmar Pedido'>
         <h1 className="text-4xl font-bold">Total y Confirmar Pedido</h1>
         <p className="text-2xl font-bold">Confirma tu pedido a continuacion</p>
         <form onSubmit={handleSubmit}>
            <div className="mt-5">
               <label htmlFor="nombre"
                  className="block uppercase text-slate-800 font-bold text-xl"
               >Nombre</label>
               <input type="text" id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
               />
            </div>
            <div className="mt-10">
               <p>
                  Total a pagar <span className="font-bold">{ formatearDinero(totalPedido) }</span>
               </p>
            </div>
            <div className="mt-5">
               <button type="submit"
                  className={`${comprobarPedido() ? 'bg-indigo-100': 'bg-indigo-600' } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                  disabled={comprobarPedido()}
               >Confirmar Pedido</button>
            </div>
         </form>
      </Layout>
   )
}