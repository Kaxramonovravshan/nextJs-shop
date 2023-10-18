"use client";


import CustomImage from "@/components/image";
import { ProductType } from "@/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings"
import { Dialog } from "@headlessui/react";
import {toast} from "react-toastify";

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();
      setProduct(product);
      setLoading(false);
    }
    getData();
  }, [id]);

  const addBag = ()=> {
    const products: ProductType[] = JSON.parse(localStorage.getItem('carts') as string) || []
    const isExistProduct = products.find(c=>c.id===product?.id)

    if(isExistProduct){
      const updatedData = products.map(c=>{
        if(c.id===product?.id){
          return {
            ...c,quantity: c.quantity + 1
          }
        }

        return c
      })
      localStorage.setItem("carts", JSON.stringify(updatedData))
    }else{
      const data = [...products, {...product, quantity:1}]
      localStorage.setItem("carts", JSON.stringify(data))

    }

    toast.success("Product added in your bag!");
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className={" relative z-50"}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel
            className={"flex gap-4 mx-auto max-w-3xl rounded bg-white p-5"}
          >
            {loading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <h4 className="fontsemi-bold">{product?.title}</h4>

                <p className="font-medium text-sm">${product?.price}</p>

                <div className="flex items-center text-sm my-4">

                  {product?.rating.rate && (
                    <div className=" mr-6">
                      <StarRatings
                          rating={product?.rating.rate}
                          starRatedColor="yellow"
                          starDimension="25px"
                          starSpacing="3px"
                          numberOfStars={5}
                          name='rating'
                      />

                    </div>
                  )}

                  <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                    See all {product?.rating.count} reviews
                  </p>
                </div>
                <p className={"mb-3"}><span className="font-bold">Rating:</span> {product?.rating.rate}</p>
                <p className="line-clamp-5 text-sm">{product?.description}</p>
              </div>
              <div className=" space-y-3 text-sm">
                <button onClick={addBag} className="button w-full text-white bg-yellow-400 hover:bg-transparent hover:border-yellow-400 hover:text-black">
                  Add to bag
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="button w-full text-white bg-yellow-400 hover:bg-transparent hover:border-yellow-400 hover:text-black"
                >
                  View full details
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailPage;
