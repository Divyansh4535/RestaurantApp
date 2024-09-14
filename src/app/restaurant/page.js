"use client";
import React from "react";
import Login from "../component/Login";
import Signup from "../component/Signup";
import { useState } from "react";
import Link from "next/link";
import RestaurantHeader from "../component/RestaurantHeader";
import RestaurantFooter from "../component/RestaurantFooter";

const Page = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="bg-gradient-to-br no-scrollbar overflow-y-auto from-slate-700 to-slate-800  w-full h-screen ">
      <RestaurantHeader login={login} setLogin={setLogin} />
      <div className=" w-full gap-5 grid place-items-center ">
        <h1 className="text-2xl my-5 font-bold text-white ">
          {" "}
          {login ? "Restaurant Login" : "Restaurant SignUp"}
        </h1>
        <div className=" bg-zinc-300 rounded-lg shadow-lg  shadow-black grid place-items-center h-[500px] w-[600px]  overflow-y-auto no-scrollbar  ">
          {login ? <Login /> : <Signup />}
          <p
            onClick={() => setLogin(!login)}
            className="hover:text-blue-700 cursor-pointer p-2 "
          >
            {" "}
            {login
              ? "Already have Account ? Sign Up"
              : "do not have Account ? Login "}{" "}
          </p>
        </div>
        {/* <RestaurantFooter /> */}
      </div>
    </div>
  );
};

export default Page;
