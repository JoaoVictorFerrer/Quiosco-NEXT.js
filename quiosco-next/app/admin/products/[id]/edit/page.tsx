import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBack";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

async function getProductById(id: number) {
  const product = await prisma.producto.findUnique({
    where: {
      id,
    },
  });
  if (!product) notFound();
  return product;
}

export default async function page({ params }: { params: { id: string } }) {
  const productId = await params;
  const product = await getProductById(+productId.id);

  return (
    <>
      <Heading> Editar Producto: {product.name}</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
