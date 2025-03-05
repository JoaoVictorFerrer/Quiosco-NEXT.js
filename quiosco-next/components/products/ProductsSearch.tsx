"use client"
import React from "react";
import { SearchSchema } from "@/src/schemas";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductsSearch() {
    const router = useRouter()
    const hanldeSearchForm = (formdata : FormData)  => {
        const data = {
            search: formdata.get('search')
        }
        const result = SearchSchema.safeParse(data)
        if(!result.success){
            result.error.issues.forEach(issue => (
                toast.error(issue.message)
            ))
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }
  return (
    <form action={hanldeSearchForm} className="flex items-center">
      <input
        type="text"
        name="search"
        placeholder="Busca un producto"
        className="p-2 placeholder-gray-400 w-full"
      />
      <input type="submit" value={'Buscar'} className="bg-indigo-600 p-2 uppercase cursor-pointer text-white"  />
    </form>
  );
}
