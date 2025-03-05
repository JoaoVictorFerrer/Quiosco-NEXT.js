import ProductsSearch from "@/components/products/ProductsSearch";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import React from "react";

const searchProducts = async (searchTerm: string) => {
  const products = await prisma.producto.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive", // me permite hacer una busqueda que no tenga que ser idenetica a la base de datos 
      },
    },
    include: {
        category: true
    }
  });
  return products
};

export default async function SearchPage({ searchParams,}: {searchParams: { search: string };}) {

  const querySearch = await searchParams;
  const products = await searchProducts(querySearch.search);
    
  return (
    <>
      <Heading>Resultado de Búsqueda:  <span className="font-bold text-2xl ml-2 "> { products.length ?  querySearch.search : 'No hemos encontrado tu busqueda'}</span></Heading>
      <div className="flex flex-col gap-5 lg:flex-row-reverse ">
        <ProductsSearch/>
      </div>
      <ProductTable products={products}/>
    </>
  );
}
