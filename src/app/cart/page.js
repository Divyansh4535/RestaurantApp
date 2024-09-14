"use client";

import React, { useState, useEffect } from "react";
import CustomerHeader from "../component/CustomerHeader";
import { DELIVERY_CHARGES, TAX } from "../lib/constent";
import { useRouter } from "next/navigation";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const page = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const TaxFood = (total * TAX) / 100;
  const TotalAmount = total + TaxFood + DELIVERY_CHARGES;
  // console.log("total :- ", total);
  const router = useRouter();
  useEffect(() => {
    let ls = localStorage.getItem("cart");
    const parseData = ls ? JSON.parse(ls) : [];
    setCartStorage(parseData);
    const newTotal = parseData.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
    // console.log("cartStorage :---------------------------------", cartStorage);
  }, []);

  const orderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };

  return (
    <div className="w-full h-screen  ">
      <CustomerHeader />
      <div className="h-[calc(100vh-10vh)] relative flex items-start justify-between  w-full ">
        <Sheet className="bg-slate-900">
          <SheetTrigger>
            <div className="md:hidden flex p-3 z-50  rounded-full bg-zinc-200 text-slate-900 font-bold absolute right-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center ">
              </SheetTitle>
              <SheetDescription className="py-2 h-[95vh] ">
                <div className="w-full h-full   bg-slate-800 text-cyan-200  flex flex-col items-center pt-5  justify-between ">
                  <div className="flex items-center justify-between  w-full h-full flex-col">
                    <div className="w-full items-center h-full overflow-y-auto no-scrollbar flex flex-col text-black">
                      {cartStorage.map((item, idx) => {
                        return (
                          <h4
                            key={item.id}
                            className="flex w-[90%] bg-slate-100   items-center px-2 justify-between"
                          >
                            {" "}
                            {item.name}: <span className=""> &#8377;{item.price} </span>{" "}
                          </h4>
                        );
                      })}
                    </div>
                    <div className="bg-slate-100  text-black w-[100%] flex flex-col gap-2 ">
                      <h4 className="flex items-center px-2 justify-between">
                        {" "}
                        Food Charges : <span className=""> &#8377;{total} </span>{" "}
                      </h4>
                      <h4 className="flex items-center px-2 justify-between">
                        {" "}
                        Tax Charges : <span className=""> &#8377;{TaxFood} </span>{" "}
                      </h4>
                      <h4 className="flex items-center px-2 justify-between">
                        {" "}
                        Delivery Charge :{" "}
                        <span className=""> &#8377;{DELIVERY_CHARGES} </span>{" "}
                      </h4>
                      <h4 className="flex items-center px-2 justify-between font-bold text-lg ">
                        {" "}
                        Total Amount : <span className="">
                          {" "}
                          &#8377;{TotalAmount}{" "}
                        </span>{" "}
                      </h4>
                    </div>
                  </div>
                  <Button
                    onClick={orderNow}
                    className="w-full h-[10%] bg-green-600 hover:bg-green-700 text-xl font-bold text-white "
                  >
                    {" "}
                    Order Now{" "}
                  </Button>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="sm:w-full md:w-[80%] bg-slate-800 overflow-y-auto no-scrollbar h-full  flex gap-8 flex-wrap items-start justify-start px-4 py-8 ">

          {cartStorage?.length > 0 ? (
            cartStorage.map((item, idx) => (
              <BackgroundGradient
                className="rounded-[22px] flex flex-col gap-3 items-center h-[400px] w-[300px] max-w-sm p-1 sm:p-5 bg-white dark:bg-zinc-900"
                key={item.id}
              >
                <img
                  src={item.path}
                  alt={item.name}
                  className=" h-[60%] rounded-lg w-full object-contain object-cover object-center"
                />
                <div className="w-full px-2 h-[50%]   overflow-y-auto no-scrollbar ">
                  <div className="w-full flex items-center justify-between">
                    <h2 className="capitalize font-bold ">{item.name}</h2>{" "}
                    <h2 className="font-bold text-green-600">
                      {" "}
                      &#8377;{item.price}
                    </h2>{" "}
                  </div>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed ">
                    {item.description}
                  </p>
                </div>
                <Button
                  className="bg-red-600 border-1   border-black hover:bg-red-500 text-white  w-full h-[15%] "
                  onClick={() => RemoveToCart(item._id)}
                >
                  Remove from Cart{" "}
                </Button>
              </BackgroundGradient>
            ))
          ) : (
            <h1 className="text-xl font-bold "> No Food item added for now</h1>
          )}
        </div>
        <div className="w-[20%] h-full shadow-lg border-l-2 border-white shadow-cyan-300 bg-slate-800 text-cyan-200 sm:hidden md:flex flex-col items-center pt-5  justify-between ">
          <div className="flex items-center justify-between  w-full h-full flex-col">
            <div className="w-full items-center h-full overflow-y-auto no-scrollbar flex flex-col text-black">
              {cartStorage.map((item, idx) => {
                return (
                  <h4
                    key={item.id}
                    className="flex w-[90%] bg-slate-100   items-center px-2 justify-between"
                  >
                    {" "}
                    {item.name}: <span className=""> &#8377;{item.price} </span>{" "}
                  </h4>
                );
              })}
            </div>
            <div className="bg-slate-100  text-black w-[100%] flex flex-col gap-2 ">
              <h4 className="flex items-center px-2 justify-between">
                {" "}
                Food Charges : <span className=""> &#8377;{total} </span>{" "}
              </h4>
              <h4 className="flex items-center px-2 justify-between">
                {" "}
                Tax Charges : <span className=""> &#8377;{TaxFood} </span>{" "}
              </h4>
              <h4 className="flex items-center px-2 justify-between">
                {" "}
                Delivery Charge :{" "}
                <span className=""> &#8377;{DELIVERY_CHARGES} </span>{" "}
              </h4>
              <h4 className="flex items-center px-2 justify-between font-bold text-lg ">
                {" "}
                Total Amount : <span className="">
                  {" "}
                  &#8377;{TotalAmount}{" "}
                </span>{" "}
              </h4>
            </div>
          </div>
          <Button
            onClick={orderNow}
            className="w-full h-[10%] bg-green-600 hover:bg-green-700 text-xl font-bold text-white "
          >
            {" "}
            Order Now{" "}
          </Button>
        </div>
      </div>

    </div>
  );
};

export default page;
