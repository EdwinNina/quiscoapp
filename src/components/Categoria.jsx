import { useQuiosco } from "@/hooks/useQuiosco"
import Image from "next/image"

export const Categoria = ({ categoria }) => {
   const { categoriaActual, handleCategoriaActual } = useQuiosco()
   const { id, nombre, icono } = categoria
   return (
      <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : '' } flex items-center gap-4 w-full border p-5 transition-all hover:bg-amber-500 cursor-pointer`}>
         <Image
            width={70}
            height={70}
            alt={nombre}
            src={`/assets/img/icono_${icono}.svg`}
         />
         <button 
            type="button" 
            className="text-2xl font-bold hover:cursor-pointer"
            onClick={ () => handleCategoriaActual(id) }
         >{nombre}</button>
      </div>
   )
}
