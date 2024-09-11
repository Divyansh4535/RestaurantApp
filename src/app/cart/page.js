"use client";

import React, { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGES, TAX } from "../lib/constent";
import { useRouter } from "next/navigation";

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
    if(JSON.parse(localStorage.getItem('user'))){
      router.push("/order")
    }else{
      router.push("/user-auth?order=true")
    }
  };

  return (
    <div className="w-full h-screen  ">
      <CustomerHeader />
      <div className="h-[calc(100vh-12.3vh)] flex items-start justify-between  w-full ">
        <div className="sm:w-full md:w-[80%] bg-red-100 overflow-y-auto no-scrollbar h-full  flex gap-8 flex-wrap items-start justify-start px-4 py-8 ">
          {cartStorage?.length > 0 ? (
            cartStorage.map((item, idx) => (
              <div
                className="w-[250px] h-[300px] flex items-center gap-1  justify-center flex-col  cursor-pointer  border-2 border-black rounded-md overflow-hidden "
                key={item.id}
              >
                <img
                  src={item.path}
                  alt={item.name}
                  className=" h-[60%] w-full object-contain object-cover object-center"
                />
                <div className="w-full px-2 h-[30%]   overflow-y-auto no-scrollbar ">
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
                <button
                  className="bg-red-600 border-t-2 border-black hover:bg-red-500 text-white  w-full h-[10%] "
                  onClick={() => RemoveToCart(item._id)}
                >
                  Remove from Cart{" "}
                </button>
              </div>
            ))
          ) : (
            <h1 className="text-xl font-bold "> No Food item added for now</h1>
          )}
        </div>
        <div className="w-[20%] h-full bg-cyan-800 text-cyan-200 sm:hidden md:flex flex-col items-center pt-5  justify-between ">
          <div className="flex items-center justify-between  w-full h-full flex-col">
            <div className="w-full items-center h-full overflow-y-auto no-scrollbar flex flex-col text-black">
              {cartStorage.map((item, idx) => {
                return (
                  <h4
                    key={item.id}
                    className="flex w-[90%] bg-slate-300   items-center px-2 justify-between"
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
          <button
            onClick={orderNow}
            className="w-full h-[10%] bg-green-600 hover:bg-green-700 text-xl font-bold text-white "
          >
            {" "}
            Order Now{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
