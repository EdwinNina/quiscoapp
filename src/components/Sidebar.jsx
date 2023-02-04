import { useQuiosco } from "@/hooks/useQuiosco";
import Image from "next/image";
import { Categoria } from "./Categoria";

export default function Sidebar() {
   const { categorias } = useQuiosco()

   return (
      <>
         <Image
            width={200}
            height={100}
            src="/assets/img/logo.svg"
            alt="imagen logotipo"
            className="mx-auto"
         />
         <nav className="mt-5">
            {
               categorias.map( categoria => (
                  <Categoria categoria={categoria} key={categoria.id}/>
               ))
            }
         </nav>
      </>
   )
}
