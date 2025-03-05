"use client";
import { updateProduct } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schemas";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const params = useParams()
  const id = +params.id!
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    const response = await updateProduct(result.data,id);
    if (response?.errors) {
        console.log('entrando aqui ',response.errors)
        response.errors.forEach((issue) => toast.error(issue.message));
        return;
    }

    toast.success('El producto se ha actualizado correctamente')
    router.push('/admin/products')
  };
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleSubmit} className="space-y-5">
        {children}{" "}
        {/* con este children consigo componer componentes del cliente rendereizando uno del servidor en este caso ProductForm */}
        <input
          type="submit"
          value={"Guardar Cambios"}
          className="w-full mt-5 text-white bg-indigo-600 font-bold text-xl p-2 hover:bg-indigo-800 cursor-pointer uppercase"
        />
      </form>
    </div>
  );
}
