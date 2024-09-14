"use client";

import React, { useState, useEffect } from "react";
import CustomerHeader from "../component/CustomerHeader";
import { DELIVERY_CHARGES, TAX } from "../lib/constent";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const TaxFood = (total * TAX) / 100;
  const TotalAmount = total + TaxFood + DELIVERY_CHARGES;
  const [removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!total) {
      // router.push("/");
    }
  }, [total]);

  useEffect(() => {
    let ls = localStorage.getItem("cart");
    const parseData = ls ? JSON.parse(ls) : [];
    setCartStorage(parseData);
    const newTotal = parseData.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
    // console.log("cartStorage :---------------------------------", cartStorage);
  }, []);

  const orderNow = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const userCity = JSON.parse(localStorage.getItem("user")).city;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let restaurantId = cart[0].restaurantId;
    let foodItemId = cart.map((item) => item._id).toString();
    console.log("userCity :------->", userCity);
    console.log("foodItemIds :---------", foodItemId);

    try {
      let deliveryBoyResponse = await fetch(
        "http://localhost:3000/api/deliveryPartner/" + userCity
      );
      deliveryBoyResponse = await deliveryBoyResponse.json();
      let deliveryBoyIds = deliveryBoyResponse.result?.map((item) => item._id);
      console.log("deliveryBoyResponse :--------->", deliveryBoyResponse);
      if (!deliveryBoyIds || deliveryBoyIds.length === 0) {
        alert("Delivery Partner is not available");
        return false;
      }
      let deliveryBoyId =
        deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

      let collection = {
        userId,
        restaurantId,
        foodItemId,
        deliveryBoyId,
        status: "confirm",
        amount: TotalAmount,
      };
      console.log("collection : ------", collection);
      let res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collection),
      });
      let response = await res.json();
      if (response.success) {
        alert("order confirm");
        setRemoveCartData(true);
        router.push("myprofile");
      } else {
        alert("order failed ");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen ">
      <CustomerHeader removeCartData={removeCartData} />
      <div className=" flex flex-col justify-center items-center w-full h-[calc(100%-13vh)]">
        <div className="h-[80%] w-[80%]  flex-col flex items-start justify-between  bg-blue-300 ">
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
          <button
            onClick={orderNow}
            className="w-full h-[10%] bg-green-600 hover:bg-green-700 text-xl font-bold text-white "
          >
            {" "}
            Place your Order Now{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
