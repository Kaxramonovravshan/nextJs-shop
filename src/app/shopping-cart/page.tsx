"use client"

import React, {useEffect, useState} from 'react';
import {ProductType} from "@/interfaces";
import CustomImage from "@/components/image";
import StarRatings from "react-star-ratings";
import Link from "next/link";
import { VscArrowLeft } from "react-icons/vsc";

function ShoppingCart() {
    const [total, setTotal] = useState<number>(0)
    const [products, setProducts] = useState<ProductType[]>(
        JSON.parse(localStorage.getItem("carts") as string) || []
    );


    const removeProduct = (id:number) =>{
        const updatedCart = products.filter(product=>product.id!==id)
        localStorage.setItem('carts',JSON.stringify(updatedCart))
        setProducts(updatedCart)
    }

    const handlePlus = (id:number) => {
        const updatedCart = products.map(product =>{
            if(product.id===id){
                return {
                    ...product,
                    quantity:product.quantity + 1
                }
            }
            return product
        })
        localStorage.setItem('carts',JSON.stringify(updatedCart))
        setProducts(updatedCart)
    }

    const handleMinus = (id:number) => {

        const currentItem = products.find(product => product.id===id)

        if(currentItem?.quantity===1){
            removeProduct(currentItem.id)
        }else{
            const updatedCart = products.map(product =>{
                if(product.id===id){
                    return {
                        ...product,
                        quantity:product.quantity - 1
                    }
                }
                return product
            })
            localStorage.setItem('carts',JSON.stringify(updatedCart))
            setProducts(updatedCart)
        }

    }


    useEffect(()=>{
        const total = products.reduce((acc,item)=>{
            return acc + item.price * item.quantity
        },0)
        setTotal(total)
    },[products])


    return (

        <>
            {products.length ? (
                <div className={"h-screen"}>
                    <div className=" min-h-full bg-gray-100 pt-20">
                        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                            <div className="rounded-lg md:w-2/3">
                                {
                                    products.map(product=>(
                                        <div key={product.id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                            <div className={"relative w-60"}>
                                                <CustomImage product={product} fill/>
                                            </div>
                                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                <div className="mt-5 sm:mt-0">
                                                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{product.title}</h2>
                                                    <p className="mt-1 mb-2 flex items-center gap-2 text-xs text-gray-700">
                                                        <StarRatings
                                                            rating={product?.rating?.rate}
                                                            starRatedColor="yellow"
                                                            starDimension="15px"
                                                            starSpacing="3px"
                                                            numberOfStars={5}
                                                            name='rating'
                                                        />
                                                        <span>{product?.rating?.rate}</span>
                                                    </p>
                                                    <p className={"line-clamp-2"}>{product.description}</p>
                                                </div>
                                                <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                    <div className="flex items-center border-gray-100">
                                                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-yellow-500 hover:text-blue-50" onClick={()=>handleMinus(product.id)}> - </span>
                                                        <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product.quantity} min="1" />
                                                        <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-yellow-500 hover:text-blue-50" onClick={()=>handlePlus(product.id)}> + </span>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <p className="text-sm font-bold">{(product?.price * product.quantity)?.toLocaleString("en-US",{style:'currency',currency:'usd'})}</p>
                                                        <svg onClick={()=>removeProduct(product.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                <div className="mb-2 flex justify-between">
                                    <p className="text-gray-700">Subtotal</p>
                                    <p className="text-gray-700">{total.toLocaleString("en-US",{style:'currency',currency:'usd'})}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-700">Cargo</p>
                                    <p className="text-gray-700">{(10).toLocaleString("en-US",{style:'currency',currency:'usd'})}</p>
                                </div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold">Total</p>
                                    <div className="">
                                        <p className="mb-1 text-lg font-bold">{(total + 10).toLocaleString("en-US",{style:'currency',currency:'usd'})}</p>
                                        <p className="text-sm text-gray-700">including VAT</p>
                                    </div>
                                </div>
                                <button className="mt-6 w-full rounded-md bg-yellow-500 py-1.5 font-medium text-blue-50 hover:bg-yellow-600">Check out</button>
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                <section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
                    <div className="container flex flex-col items-center ">
                        <div className="flex flex-col gap-6 max-w-md text-center">
                            <h2 className="font-extrabold text-5xl text-gray-600">
                                Shopping cart is empty
                            </h2>
                            <Link className={"flex items-center gap-2 justify-center bg-yellow-500 mt-3 hover:bg-yellow-600 button text-white"} href={"/"}>
                                <VscArrowLeft size={30}/>Go back
                            </Link>
                        </div>
                    </div>
                </section>
            )}

        </>




    );
}

export default ShoppingCart;