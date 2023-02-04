import { useRouter } from "next/router"

const pasos = [
   { id: 1, nombre: 'Menu', url: '/'},
   { id: 2, nombre: 'Resumen', url: '/resumen'},
   { id: 3, nombre: 'Datos y Total', url: '/total'}
]


export default function Pasos() {
   const router = useRouter()

   const calcularPaso = () => {
      let paso;
      if(router.pathname === '/'){
         paso = 10;
      }else if(router.pathname === '/resumen'){
         paso = 50
      }else{
         paso = 100;
      }
      return paso;
   }

   return (
      <>
         <div className="flex justify-between mb-5">
            {
               pasos.map( paso => (
                  <button 
                     key={paso.id}
                     className="text-2xl font-bold"
                     onClick={() => router.push(paso.url) }
                  >{paso.nombre}</button>
               ))
            }
         </div>
         <div className="bg-gray-100 mb-10">
            <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white transition-all" style={{width: `${calcularPaso()}%`}}></div>
         </div>
      </>
   )
}
