"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { getImagePath } from "@/src/utils";

export default function UploadImage({image} :{image: string | undefined}) {
  const [imageUrl, setImageUrl] = useState();
  return (
    <CldUploadWidget
      uploadPreset="QuiscoNEXT"
      options={{
        maxFiles: 1,
      }}
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          //@ts-ignore
          setImageUrl(result.info.secure_url);
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Imagen Producto</label>
            <div
              className=" relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Agregar Imagen</p>
              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    src={imageUrl}
                    style={{ objectFit: "contain" }}
                    alt="Imagen de Producto"
                  />
                </div>
              )}
            </div>
          </div>
          {image && !imageUrl && (
            <div>
              <label htmlFor="">Imagen Actual</label>
              <div className="relative w-64 h-64">
              <Image fill src={getImagePath(image)} alt="imagen del producto" />

              </div>
            </div>
          )}
          <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image} />
        </>
      )}
    </CldUploadWidget>
  );
}
