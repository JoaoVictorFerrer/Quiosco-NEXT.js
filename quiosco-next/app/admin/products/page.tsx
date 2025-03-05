import { PageProps } from "@/.next/types/app/page";
import ProductPagination from "@/components/products/ProductPagination";
import ProductsSearch from "@/components/products/ProductsSearch";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const productCount = async () => {
  const totalProducts = prisma.producto.count();
  return totalProducts;
};

const getProducts = async (pageNow: number, pageSize: number) => {
  const skip = (pageNow - 1) * pageSize;
  const products = await prisma.producto.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });

  return products;
};
//geneor un type directamente utilizandond la inferencia de typeScript asi si se me cambia el query se adaptara automaticamente
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: PageProps) {
  const { page } = await searchParams; // el searchParams es inyectado diretamente por el query de la url
  const pageNow = +page || 1;
  const pageSize = 10;

  if (pageNow < 0) redirect("/admin/products"); // impidiendo paginas negaticas consultadas

  const productsData = getProducts(pageNow, pageSize);
  const totalProcductsData = productCount();

  const [products, totalProcducts] = await Promise.all([
    productsData,
    totalProcductsData,
  ]); // consultas paralelas ya que no depende ninguna de la otra
  const totalPages = Math.ceil(totalProcducts / pageSize);

  if (pageNow > totalPages) redirect("/admin/products"); // impidiendo que consuelten mas paginas de la que existe

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between ">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>
        <ProductsSearch/>
      </div>
      <ProductTable products={products} />
      <ProductPagination pageNow={pageNow} totalPages={totalPages} />
    </>
  );
}
