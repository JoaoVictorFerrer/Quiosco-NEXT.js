import Link from "next/link";
import React from "react";

type ProductPaginationProps = {
  pageNow: number;
  totalPages: number;
};

export default function ProductPagination({
  pageNow,
  totalPages,
}: ProductPaginationProps) {

    const pages = Array.from({length: totalPages}, (_,i) => i + 1  )
  return (
    <nav className=" flex justify-center py-10">
      {pageNow !== 1 && (
        <Link
          href={`/admin/products?page=${pageNow - 1}`}
          className="flex items-center bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}

       {pages.map(pageCurrent => (
              <Link
              key={pageCurrent}
              href={`/admin/products?page=${pageCurrent}`}
              className={` ${pageCurrent === pageNow ? 'font-bold bg-amber-300' : "bg-white" } flex items-center  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
            >
                {pageCurrent}
            </Link>
       ) )}
      {pageNow < totalPages && (
        <Link
          href={`/admin/products?page=${pageNow + 1}`}
          className=" flex items-center bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
