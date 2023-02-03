import axios from 'axios'
import { useState, useEffect, createContext } from 'react'

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
   const [categorias, setCategorias] = useState([])
   const [categoriaActual, setCategoriaActual] = useState({})
   const [producto, setProducto] = useState({})
   const [modal, setModal] = useState(false)
   const [pedido, setPedido] = useState([])

   const obtenerCategorias = async () => {
      const { data } = await axios('/api/categorias')
      setCategorias(data)
      if(data){
         setCategoriaActual(data[0]);
      }
   }

   const handleCategoriaActual = id => {
      const categoria = categorias.find( cat => cat.id === id)
      setCategoriaActual(categoria)
   }
   
   const handleProducto = producto => {
      setProducto(producto)
   }

   const handleModal = () => {
      setModal(!modal)
   }

   const handlePedido = producto => {
      if(pedido.some( productoState => productoState.id === producto.id)){
      }else{
         setPedido({
            ...pedido,
            producto
         })
      }
   }

   useEffect(() => {
      obtenerCategorias()
   }, [])
   return (
      <QuioscoContext.Provider
         value={{
            categorias,
            categoriaActual,
            handleCategoriaActual,
            handleProducto,
            handleModal,
            modal,
            producto
         }}
      >
         { children }
      </QuioscoContext.Provider>
   )
}

export {
   QuioscoProvider
}

export default QuioscoContext