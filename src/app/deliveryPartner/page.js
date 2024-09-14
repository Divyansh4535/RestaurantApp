"use client";
import React, { useState,useEffect } from "react";
import Button from "../Components/Input/Button";
import InputText from "../Components/Input/InputText";
import CustomerHeader from "../component/CustomerHeader";
import { useRouter } from "next/navigation";
import DeliveryHeader from "../component/DeliveryHeader";

const DeliveryPartner = () => {
  const router = useRouter();
  const [loginContact, setLoginContact] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [login, setLogin] = useState(true);

  const handlerSubmitLogin = async (e) => {
    e.preventDefault();
    if (!loginContact || !loginPassword) {
      setErrorLogin(true);
      return false;
    } else {
      setErrorLogin(false);
    }
    console.log('password ,contact :-->', loginPassword ,loginContact )
    let response = await fetch(
      "http://localhost:3000/api/deliveryPartner/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: loginPassword,
          contact: loginContact,
        }),
      }
    );
    response = await response.json();
    console.log("response login :===>", response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      alert("success");
      router.push('/deliveryDashboard')
    } else {
      alert("failed to login . ");
    }
    setLoginPassword("");
    setLoginContact("");
  };

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState({
    contact: "",
    password: "",
    cPassword: "",
    name: "",
    city: "",
    address: "",
  });

  const checkValidValue = () => {
    let isValid = true;
    if (name === "") {
      setError((prev) => ({ ...prev, name: "Name value is required!" }));
      isValid = false;
    }
    if (city === "") {
      setError((prev) => ({ ...prev, city: " city  value is required!" }));
      isValid = false;
    }
    if (address === "") {
      setError((prev) => ({ ...prev, address: "Address value is required!" }));
      isValid = false;
    }
    if (contact === "") {
      setError((prev) => ({ ...prev, contact: "Contact value is required!" }));
      isValid = false;
    } else if (contact.length !== 10) {
      setError((prev) => ({
        ...prev,
        contact: "Contact value should be only 10 digits!",
      }));
      isValid = false;
    }
    if (password !== cPassword) {
      // setError(prev => ({ ...prev, password: "confirm Password  is does not matched " }))
      setError((prev) => ({
        ...prev,
        cPassword: "confirm Password is not match ",
      }));
      isValid = false;
    } else if (password === "") {
      setError((prev) => ({
        ...prev,
        password: "Password value is required ",
      }));
      isValid = false;
    }
    if (cPassword === "") {
      setError((prev) => ({
        ...prev,
        cPassword: " Confirm Password value is required ",
      }));
      isValid = false;
    }
    return isValid;
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    console.log(
      " name,  password, city, address, contact",
      name,
      password,
      city,
      address,
      contact
    );
    console.log(" ****************1*****************");
    if (!checkValidValue()) return;
    console.log(" ****************11*****************");

    let response = await fetch(
      "http://localhost:3000/api/deliveryPartner/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, city, address, contact }),
      }
    );
    response = await response.json();
    console.log(" ****************2*****************");
    console.log("response :---->", response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      console.log(" ****************3*****************");
      alert("User Sign Up successfully ");
      router.push('/deliveryDashboard')
    
    } else {
      alert("User Sign Up Unsuccessfully ");
    }
    console.log(" ****************4*****************");
    setName("");
    setPassword("");
    setCPassword("");
    setCity("");
    setAddress("");
    setContact("");
    setError({});
};

useEffect(() => {
  const delivery = JSON.parse(localStorage.getItem('delivery'))
  if (delivery) {
    router.push('/deliveryDashboard')
  }
}, [])


  return (
    <div className="w-full h-[calc(100%-15vh)]  flex flex-col items-center  ">
      <DeliveryHeader/>
      <div className="flex flex-col w-full">
        { !login ? (
          <div className="flex bg-slate-100 flex-col h-full  w-full  items-center p-5 gap-5 ">
            <h2 className="text-2xl font-bold ">LogIn </h2>
            <form
              className="flex w-[50vw] bg-cyan-800  justify-center  rounded-lg shadow-lg overflow-y-auto shadow-black no-scrollbar py-5 h-[70vh]  items-center  gap-5 flex-col"
              onSubmit={handlerSubmitLogin}
            >
              <div className="relative w-[50%]">
                <InputText
                  Type="number"
                  Name="Contact"
                  value={loginContact}
                  onChange={(e) => setLoginContact(e.target.value)}
                  Placeholder="Enter your Contact"
                />
                {errorLogin && !loginContact && (
                  <span className="absolute text-xs text-red-300 font-light">
                    Please Enter a valid Contact no{" "}
                  </span>
                )}
              </div>
              <div className="relative w-[50%] mb-2">
                <InputText
                  Type="password"
                  Name="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                {errorLogin && !loginPassword && (
                  <span className="absolute text-xs text-red-300 font-light">
                    Please Enter a valid password{" "}
                  </span>
                )}
              </div>
              <Button Name="LogIn" />
            </form>
            <h1
              className="cursor-pointer hover:text-blue-500 "
              onClick={() => setLogin(!login)}
            >
              Do not have a account ? SignUp
            </h1>
          </div>
        ) : (
        <div className="flex bg-slate-100 flex-col h-full  w-full  items-center p-5 gap-5 ">
            <h2 className="text-2xl font-bold "> User Sign Up </h2>
            <form
              onSubmit={handleSubmitSignUp}
              className="flex w-[50vw] bg-cyan-800   rounded-lg shadow-lg overflow-y-auto shadow-black no-scrollbar py-5 h-[70vh]  items-center  gap-5 flex-col"
            >
              <div className="relative w-[50%]">
                <InputText
                  value={name}
                  onChange={(e) => {
                    setError((prev) => ({ ...prev, name: "" }));
                    setName(e.target.value);
                  }}
                  Name="Name"
                />
                {error?.name && (
                  <span className="text-xs text-red-300 font-light absolute">
                    {" "}
                    {error.name || ""}{" "}
                  </span>
                )}
              </div>
              <div className="relative w-[50%]">
                <InputText
                  value={password}
                  onChange={(e) => {
                    setError((prev) => ({ ...prev, password: "" }));
                    setPassword(e.target.value);
                  }}
                  Type="password"
                  Name="Password"
                />
                {error?.password && (
                  <span className="text-xs text-red-300 font-light absolute">
                    {" "}
                    {error.password || ""}{" "}
                  </span>
                )}
              </div>
              <div className="relative w-[50%]">
                <InputText
                  value={cPassword}
                  onChange={(e) => {
                    setError((prev) => ({ ...prev, cPassword: "" }));
                    setCPassword(e.target.value);
                  }}
                  Type="password"
                  Name="Confirm Password"
                />
                {error?.cPassword && (
                  <span className="text-xs text-red-300 font-light absolute">
                    {" "}
                    {error.cPassword || ""}{" "}
                  </span>
                )}
              </div>
              <div className="relative w-[50%]">
                <InputText
                  value={city}
                  onChange={(e) => {
                    setError((prev) => ({ ...prev, city: "" }));
                    setCity(e.target.value);
                  }}
                  Name="Enter City  "
                />
                {error?.city && (
                  <span className="text-xs text-red-300 font-light absolute">
                    {" "}
                    {error.city || ""}{" "}
                  </span>
                )}
              </div>
              <div className="relative w-[50%]">
                <InputText
                  value={address}
                  onChange={(e) => {
                    setError((prev) => ({ ...prev, address: "" }));
                    setAddress(e.target.value);
                  }}
                  Name="Enter Full Address "
                />
                {error?.address && (
                  <span className="text-xs text-red-300 font-light absolute">
                    {" "}
                    {error.address || ""}{" "}
                  </span>
                )}
              </div>
              <div className="relative w-[50%]">
                <InputText
                  value={contact}
                  onChange={(e) => {
                    setError((prev) => ({ ...prev, contact: "" }));
                    setContact(e.target.value);
                  }}
                  Name="Enter Contact Number "
                  Type="number"
                />
                {error?.contact && (
                  <span className="text-xs text-red-300 font-light absolute">
                    {" "}
                    {error.contact || ""}{" "}
                  </span>
                )}
              </div>
              <Button Name="Sign Up" Type="submit" ClassName="mt-5" />
            </form>
            <h1
              className="cursor-pointer hover:text-blue-500 "
              onClick={() => setLogin(!login)}
            >
              Already have a account ? login
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPartner;
