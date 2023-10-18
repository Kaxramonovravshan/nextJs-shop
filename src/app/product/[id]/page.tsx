import React from 'react';
import NotFound from "next/dist/client/components/not-found-error";
import CustomImage from "@/components/image";

interface Props {
    params:{
        id:string
    }
}

async function ProductDetailPage({params: {id}}: Props) {

    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product = await res.json()


    try {
        return (
            <div className={"max-w-5xl mx-auto flex flex-col md:flex-row mt-40 pb-10 items-center gap-8 px-4 "}>
                <CustomImage product={product}/>
                <div className={"divide-2"}>
                    <div className={"space-y-2 pb-8"}>
                        <h1 className={"text-2xl md:text-4xl font-bold"}>{product.title}</h1>
                        <h2 className={"text-gray-500 font-bold text-xl md:text-3xl"}>${product.price}</h2>
                    </div>
                    <div className="pt-4">
                        <p className="text-xs md:text-sm">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        NotFound()
    }


}

export default ProductDetailPage;