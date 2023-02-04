import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
   const router = useRouter()
   const [categorias, setCategorias] = useState([])
   const [categoriaActual, setCategoriaActual] = useState({})
   const [producto, setProducto] = useState({})
   const [modal, setModal] = useState(false)
   const [pedido, setPedido] = useState([])
   const [totalPedido, setTotalPedido] = useState(0)
   const [nombre, setNombre] = useState('')

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
      router.push('/')
   }
   
   const handleProducto = producto => {
      setProducto(producto)
   }

   const handleModal = () => {
      setModal(!modal)
   }

   const handlePedido = producto => {
      if(pedido.some( productoState => productoState.id === producto.id)){
         const pedidoActualizado = pedido.map( productoState => productoState.id === producto.id ? producto : productoState)
         setPedido(pedidoActualizado)
         toast.success('Guardado Correctamente')
      }else{
         setPedido([
            ...pedido,
            producto
         ])
         toast.success('Pedido agregado correctamente')
      }
      handleModal()
   }

   const handleEditarPedido = id => {
      const productoSeleccionado = pedido.find( productoState => productoState.id === id)
      setProducto(productoSeleccionado)
      handleModal()
   }

   const handleEliminarProductoPedido = id => {
      const productosPedido = pedido.filter( productoState => productoState.id !== id)
      setPedido(productosPedido)
   }

   const obtenerTotalPedido = () => {
      const total = pedido.reduce((acc, curr) => acc + (curr.cantidad * curr.precio), 0)
      setTotalPedido(total)
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
            producto,
            handlePedido,
            pedido,
            handleEditarPedido,
            handleEliminarProductoPedido,
            obtenerTotalPedido,
            totalPedido,
            setNombre,
            nombre
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