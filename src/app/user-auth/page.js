"use client"
import React,{useState} from "react";
import CustomerHeader from "../_components/CustomerHeader";
import UserSignUp from "../_components/User-SignUp";
import UserLogin from "../_components/UserLogin";

const page = (props) => {
  const [login, setLogin] = useState(true);
  console.log('order : -', props)
  
  return (
    <div className="w-full">
      <CustomerHeader />
      {!login ? <UserSignUp redirect={props.searchParams} login={login} setLogin={setLogin} /> : <UserLogin login={login} setLogin={setLogin} redirect={props.searchParams} />}
    </div>
  );
};

export default page;
