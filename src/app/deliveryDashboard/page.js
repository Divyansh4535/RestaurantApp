"use client";
import React, { useState, useEffect } from "react";
import DeliveryHeader from "../component/DeliveryHeader";
import { useRouter } from "next/navigation";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Loading from "../Components/Input/Loading";

const page = () => {
  const router = useRouter();

  const [myOrder, setMyOrder] = useState([]);

  const getMyOrder = async () => {
    let userStorage = JSON.parse(localStorage.getItem("delivery"));
    let ID = userStorage._id;
    console.log("ID :-------->", ID);
    let response = await fetch(
      "http://localhost:3000/api/deliveryPartner/order/" + ID
    );
    response = await response.json();
    console.log("response:----------->", response);
    if (response.success) {
      setMyOrder(response.result);
    }
  };

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));
    if (!delivery) {
      router.push("/deliveryPartner");
    }
    getMyOrder();
  }, []);

  return (
    <div className="w-full h-screen flex items-center bg-slate-800 justify-between flex-col ">
      <DeliveryHeader />
      <div className="w-full h-[calc(100%-10vh)] gap-2  items-center flex flex-col  ">
        <h1 className="text-4xl font-bold text-white py-4 ">My Order List </h1>
        {myOrder.length > 0 ? (
          <div className="flex md:gap-5 gap-2 flex-wrap h-full px-2 w-full ">
            {myOrder?.map((item, idx) => {
              return (
                <div
                  className="rounded-[22px] h-[200px] max-w-sm  p-4 sm:p-5 bg-white dark:bg-zinc-900"
                  key={idx}
                >
                  <h3 className="capitalize text-lg font-bold">
                    Name : {item.data.name}
                  </h3>
                  <h3 className="capitalize">Amount : {item.amount}</h3>
                  <h3 className="capitalize">Address : {item.data.address}</h3>
                  <h3 className="capitalize">Status : {item.status}</h3>
                  <h3 className="capitalize flex gap-2 items-center">
                    Update Status :
                    <select className="text-cyan-900">
                      <option>Confirm</option>
                      <option>On the way</option>
                      <option>Delivered</option>
                      <option>Failed To Deliver</option>
                    </select>
                  </h3>
                </div>
              );
            })}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default page;
