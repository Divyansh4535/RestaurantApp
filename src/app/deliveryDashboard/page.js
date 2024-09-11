"use client";
import React, { useState, useEffect } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [myOrder, setMyOrder] = useState([]);

  const getMyOrder = async () => {
    let userStorage = JSON.parse(localStorage.getItem("delivery"));
    let ID = userStorage._id;
    console.log("ID :-------->", ID);
    let response = await fetch("http://localhost:3000/api/deliveryPartner/order/" + ID);
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
    <div className="w-full h-screen flex items-center bg-slate-100 justify-between flex-col ">
      <DeliveryHeader />
      <div className="w-full h-[calc(100%-10vh)] gap-2  items-center flex flex-col  ">
        <h1 className="text-4xl font-bold">My orderList </h1>
        <div className="flex gap-5 flex-wrap h-full px-2 w-full ">
          {myOrder?.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex p-5 items-start justify-start flex-col bg-cyan-800 text-cyan-200 rounded-md w-96 h-44   "
              >
                <h3 className="capitalize text-lg font-bold ">Name : {item.data.name}</h3>
                <h3 className="capitalize ">Amount : {item.amount}</h3>
                <h3 className="capitalize ">address : {item.data.address}</h3>
                <h3 className="capitalize ">Status : {item.status}</h3>
                <h3 className="capitalize flex gap-2 items-center ">Update Status :
                      <select className ="text-cyan-800">
                        <option>Confirm</option>
                        <option>On the way</option>
                        <option>Delivered</option>
                        <option>Failed To Delivered</option>
                    </select> </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
