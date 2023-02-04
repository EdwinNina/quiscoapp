import ResumenPedido from "@/components/ResumenPedido";
import { useQuiosco } from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";

export default function Resumen() {
   const { pedido } = useQuiosco();

   return (
      <Layout pagina='Resumen'>
         <h1 className="text-4xl font-bold">Resumen</h1>
         <p className="text-2xl font-bold">Revisa tu pedido</p>
         {
            pedido.length === 0
               ? ( <p className="text-xl text-center">Aún no tienes productos en tu pedido</p>)
               : pedido.map( producto => (
                  <ResumenPedido
                     key={producto.id}
                     producto={producto}
                  />
               ))
         }
      </Layout>
   )
}