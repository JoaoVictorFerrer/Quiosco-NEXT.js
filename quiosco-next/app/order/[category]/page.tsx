import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import React from "react";

async function getProducts(category: string) {
  const products = await prisma.producto.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
}
//este params proviene de routing dinamico de next.js
export default async function OrderPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;
  const products = await getProducts(category);

  return (
    <>
      <Heading>
       Elige y personaliza tu pedido acontinuación
      </Heading>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
