"use client";

import { ProductType } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import CustomImage from "./image";

const Products: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <div>
      <Link
        href={`/product/${product.id}`}
        className="h-96 flex flex-col group hover:scale-105 transition-transform ease-out duration-200 border p-6 rounded-lg"
      >
        <div className=" relative max-h-80 flex-1">
          <CustomImage product={product} fill />
        </div>
        <h3 className="tracking-widest mt-5 text-indigo-500w font-medium title-font">
          {product.category}
        </h3>
        <div className=" font-semibold flex items-center justify-between mt-4 mb-3">
          <p className="w-44 truncate">{product.title}</p>
          <p>${product.price}</p>
        </div>
        <p className="leading-relaxed text-base line-clamp-3">
          {product.description}
        </p>
      </Link>
    </div>
  );
};

export default Products;
