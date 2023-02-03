import { useQuiosco } from "@/hooks/useQuiosco";
import { formatearDinero } from "helpers";
import Image from "next/image";

export default function Producto({ producto }) {

   const { handleProducto, handleModal } = useQuiosco();

   const { nombre, precio, imagen } = producto;

   return (
      <div className="border p-3">
         <Image
            src={`/assets/img/${imagen}.jpg`}
            alt={`Imagen platillo ${nombre}`}
            width={400}
            height={500}
         />
         <div className="p-5">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
               { formatearDinero(precio) }
            </p>
         </div>
         <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
            onClick={() => {
               handleProducto(producto)
               handleModal()
            }}
         >Agregar
         </button>
      </div>
   )
}
