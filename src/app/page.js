"use client";
import React, { useState, useEffect } from "react";
import CustomerHeader from "./component/CustomerHeader";
import InputText from "./Components/Input/InputText";
import { useRouter } from "next/navigation";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Loading from "./Components/Input/Loading";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const Page = () => {
  const [location, setLocation] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [selectLocation, setSelectLocation] = useState("");
  const [showOption, setShowOption] = useState(false);
  const router = useRouter();
  const loadLocation = async () => {
    let response = await fetch("http://localhost:3000/api/customer/location");
    response = await response.json();
    if (response.success) {
      setLocation(response.result);
    }
  };

  const loadRestaurant = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
      console.log("url", url);
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
      console.log("url", url);
    }
    let response = await fetch(url);
    console.log("response ", response);
    response = await response.json();
    if (response.success) {
      setRestaurant(response.result);
    }
  };
  const handleOption = (item) => {
    setSelectLocation(item);
    setShowOption(false);
    loadRestaurant({ location: item });
  };

  useEffect(() => {
    loadLocation();
    loadRestaurant();
  }, []);

  return (
    <main>
      <CustomerHeader />
      <div
        className="w-full gap-8  h-[300px] flex flex-col  items-center justify-center "
        style={{
          backgroundImage: "url(/Assets/banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-extrabold "> Food Delivery App </h1>
        <div className=" flex items-center justify-between gap-5 h-16 w-[80%] ">
          <div className=" h-full w-[20%] z-50 flex items-center  flex-col relative ">
            <input
              type="text"
              className="h-full w-full select-none px-5 text-xl  "
              placeholder="Select Place"
              value={selectLocation}
              onClick={() => setShowOption(!showOption)}
            />
            <ul className=" absolute top-[101%] w-full flex items-center flex-col gap-[1px]">
              {showOption &&
                location.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-sky-800 w-full h-10 text-center cursor-pointer hover:bg-sky-900 font-medium text-white text-lg    "
                    onClick={() => handleOption(item)}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
          <input
            type="text"
            className="h-full w-[80%] select-none px-5 text-xl  "
            placeholder="Select Food & Restaurant Name"
            onChange={(e) => loadRestaurant({ restaurant: e.target.value })}
          />
        </div>
      </div>
      <div className="w-full h-full py-5 flex items-center ">
        {restaurant.length > 0 ? (
          <div className="w-full bg-slate-800 flex gap-8 flex-wrap items-center  justify-evenly px-4 py-8 ">
            {restaurant.map((item, idx) => (
                <BackgroundGradient key={idx}
                  className="rounded-[22px] flex flex-col gap-3 items-center h-[300px] w-[300px] max-w-sm p-2 sm:p-8 bg-white dark:bg-zinc-900"
                >
                  <h1 className="text-xl font-bold capitalize ">{item.name}</h1>
                  <div className="flex flex-col items-start gap-1 justify-center ">
                    <h2>
                      {" "}
                      <span className="text-base font-semibold ">Contact</span> :{" "}
                      {item.contact}
                    </h2>
                    <h2>
                      {" "}
                      <span className="text-base font-semibold capitalize ">
                        City
                      </span>{" "}
                      : {item.city}
                    </h2>
                    <h2>
                      {" "}
                      <span className="text-base font-semibold capitalize ">
                        Address
                      </span>{" "}
                      : {item.address}
                    </h2>
                    <h2>
                      {" "}
                      <span className="text-base font-semibold ">Email</span> :{" "}
                      {item.email}
                    </h2>
                  </div>
                  <Button onClick={() =>
                    router.push("explore/" + item.name + "?id=" + item._id)
                  } > Click me </Button>
                </BackgroundGradient>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      
    </main>
  );
};

export default Page;