"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavigationAdminProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

export default function NavigationAdmin({ link }: NavigationAdminProps) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(link.url)
  return (
    <Link
      className={`${isActive ? ' bg-amber-300' : ''} text-xl p-3 ml-2 border-gray-200 font-bold border-t last-of-type:border-b`}
      href={link.url}
      target={link.blank ? '_blank': ''}
    >
      {link.text}
    </Link>
  );
}
