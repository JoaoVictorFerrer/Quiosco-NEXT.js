import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'
import React from 'react'

export default function CreateProduct() {
  return (
   <>
    <Heading>Nuevo Producto</Heading>
    <AddProductForm>
      <ProductForm/> {/* estoy compiendo este componente para rendereizar un componente de servidor en un componente del cliente   */}
    </AddProductForm>

   
   </>
  )
}
