"use client";
import CustomerHeader from "@/app/component/CustomerHeader";
import Loading from "@/app/Components/Input/Loading";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = (props) => {
  let name = props.params.name;
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItem, setFoodItem] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [cartIds, setCartIds] = useState(
    cartStorage ? () => cartStorage.map((item) => item._id) : []
  );
  const [removeCartItem, setRemoveCartItem] = useState();
  console.log("cartIds", cartIds);

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    console.log("search id :", id);
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    console.log("response :- ", response);
    response = await response.json();
    console.log("response :- ", response);
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItem(response.foodItem);
    }
  };
  const AddToCart = (item) => {
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCartIds(localCartIds);
    setCartData(item);
    setRemoveCartItem();
  };
  const RemoveToCart = (id) => {
    setRemoveCartItem(id);
    let localIds = cartIds.filter((item) => item != id);
    setCartIds(localIds);
    setCartData();
  };

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  return (
    <div className="w-full h-screen">
      <CustomerHeader removeCartItem={removeCartItem} cartData={cartData} />
      <div className=" h-fit w-full bg-slate-800 ">
        <div
          style={{
            backgroundImage: "url(/Assets/pizzz-banner.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="relative h-[300px]  flex items-center justify-center"
        >
          <h1 className="text-6xl font-bold capitalize"> {decodeURI(name)}</h1>
          <div className="flex absolute md:h-6 md:border-b-2 md:border-black bottom-0 md:bg-white md:bottom-[-22px] flex-col md:py-auto md:flex-row px-4 items-start justify-between w-full  ">
            <h4 className="text-base font-medium">
              Contact : {restaurantDetails?.contact}
            </h4>
            <h4 className="text-base font-medium capitalize">
              City : {restaurantDetails?.city}
            </h4>
            <h4 className="text-base font-medium capitalize">
              Address : {restaurantDetails?.address}
            </h4>
            <h4 className="text-base font-medium ">
              Email : {restaurantDetails?.email}
            </h4>
          </div>
        </div>
      </div>
      {foodItem.length > 0 ? (
        <div className="w-full flex gap-4 max-h-fit min-h-screen py-10 bg-slate-800 flex-wrap items-center  justify-evenly px-4   ">
          {foodItem.length > 0 ? (
            foodItem.map((item, idx) => (
              <BackgroundGradient className="rounded-[22px] max-w-sm p-2 sm:p-5 bg-white dark:bg-zinc-900 w-[300px] h-[400px] flex items-center gap-1  justify-center flex-col  cursor-pointer    overflow-hidden "
                key={item.id}
              >
                <img
                  src={item.path}
                  alt={item.name}
                  className="h-[60%] rounded-lg w-full object-contain object-cover object-center"
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
                {cartIds.includes(item._id) ? (
                  <Button className="bg-red-600 border-2 border-black hover:bg-red-500 text-white  w-full h-[15%] "
                    onClick={() => RemoveToCart(item._id)}
                  >
                    {" "}
                    Remove from Cart{" "}
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-600 border-2 border-black hover:bg-blue-500 text-white  w-full h-[15%] "
                    onClick={() => AddToCart(item)}
                  >
                    {" "}
                    Add to Cart{" "}
                  </Button>
                )}
              </BackgroundGradient>
            ))
          ) : (
            <h1 className="text-xl font-bold "> No Food item added for now</h1>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default page;
