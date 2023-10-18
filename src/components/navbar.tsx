import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font bg-white ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <Link href={"/"} className="mr-5 hover:text-yellow-400">Home Page</Link>
          <Link href={"/products"} className="mr-5 hover:text-yellow-400">All Products</Link>
        </nav>
        <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <Image width={150} height={40} src={"./alifshop.svg"} alt={"logo"} />
        </a>
        <div className="lg:w-2/5 inline-flex space-x-4 lg:justify-end ml-5 lg:ml-0">
          <Link href={"/shopping-cart"}>
            <button className="button focus:outline-none bg-yellow-400 text-white border-transparent hover:border-yellow-400 hover:bg-transparent hover:text-black">
              Basket
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
