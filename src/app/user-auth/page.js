"use client"
import React,{useState} from "react";
import CustomerHeader from "../component/CustomerHeader";
import UserSignUp from "../component/User-SignUp";
import UserLogin from "../component/UserLogin";

const Page = (props) => {
  const [login, setLogin] = useState(true);
  console.log('order : -', props)
  
  return (
    <div className="w-full">
      <CustomerHeader />
      {!login ? <UserSignUp redirect={props.searchParams} login={login} setLogin={setLogin} /> : <UserLogin login={login} setLogin={setLogin} redirect={props.searchParams} />}
    </div>
  );
};

export default Page;
