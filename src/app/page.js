"use client";
import React, { useState, useEffect } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import InputText from "./Components/Input/InputText";
import { useRouter } from "next/navigation";

const page = () => {
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
        className="w-full gap-8  h-[300px] flex flex-col bg-red-100 items-center justify-center "
        style={{
          backgroundImage: 'url("/public/Assets/banner.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-extrabold "> Food Delivery App </h1>
        <div className=" flex items-center justify-between gap-5 h-16 w-[80%] ">
          <div className=" h-full w-[20%] flex items-center bg-red-800 flex-col relative ">
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
                    className="bg-sky-200 w-full h-10 text-center cursor-pointer hover:bg-sky-300 font-medium text-lg    "
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
      <div className="w-full flex gap-8 flex-wrap items-center  justify-evenly px-4 py-8 ">
        {restaurant.map((item, idx) => (
          <div
            className="w-[300px] h-[300px] flex items-center gap-5  justify-center flex-col bg-blue-200 cursor-pointer hover:bg-blue-400  "
            key={idx}
            onClick={() =>
              router.push("explore/" + item.name + "?id=" + item._id)
            }
          >
            <h1 className="text-xl font-medium  capitalize ">{item.name}</h1>
            <div className="flex flex-col items-start justify-center ">
              <h2>
                {" "}
                <span className="text-base font-medium ">Contact</span> :{" "}
                {item.contact}
              </h2>
              <h2>
                {" "}
                <span className="text-base font-medium capitalize ">
                  City
                </span>{" "}
                : {item.city}
              </h2>
              <h2>
                {" "}
                <span className="text-base font-medium capitalize ">
                  Address
                </span>{" "}
                : {item.address}
              </h2>
              <h2>
                {" "}
                <span className="text-base font-medium ">Email</span> :{" "}
                {item.email}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
