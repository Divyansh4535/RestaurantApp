"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"



const CustomerHeader = (props) => {
  const [cartNum, setCartNum] = useState(0)
  const [cartItem, setCartItem] = useState([])
  const [user, setUser] = useState([])
  const route = useRouter()

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'))
    setCartItem(cartStorage)
    setCartNum(cartStorage?.length)
    const userStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
    setUser(userStorage)
  }, [])
  // console.log('user :-------------->', user)
  useEffect(() => {
    if (props.cartData) {

      if (cartNum) {
        if (cartItem[0].restaurantId != props.cartData.restaurantId) {
          localStorage.removeItem("cart")
          setCartNum(1)
          setCartItem([props.cartData])

        } else {
          let localCartItem = cartItem
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)))
          setCartItem(localCartItem)
          setCartNum(cartNum + 1)
          localStorage.setItem('cart', JSON.stringify(localCartItem))
        }

      } else {
        setCartNum(1)
        setCartItem([props.cartData])
        localStorage.setItem('cart', JSON.stringify([props.cartData]))
      }
    }
  }, [props.cartData])

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setCartNum(null)
    route.push("/user-auth")
  }

  useEffect(() => {
    if (props.removeCartItem) {
      let localCartItem = cartItem.filter((item) => item._id != props.removeCartItem)
      setCartItem(localCartItem)
      setCartNum(cartNum - 1)
      localStorage.setItem('cart', JSON.stringify(localCartItem))
      if (localCartItem.length == 0) {
        localStorage.removeItem('cart')
      }
    }
  }, [props.removeCartItem])

  useEffect(() => {
    if (props.removeCartData) {
      setCartItem({})
      setCartNum(0)
      localStorage.removeItem('cart')
    }
  }, [props.removeCartData])


  return (
    <div className='bg-background/100  sticky  backdrop-blur border-b-2 flex items-center justify-between w-full h-16  '>
      <div className="p-4 h-16 justify-between  w-full flex items-center ">
        <div className="flex items-center gap-2">
          <img src="../../../Assets/log.jpg" className="size-12" alt="Logo" />
          <h1 className="text-lg font-bold ">TastyTrails</h1>
        </div>
        <div className="items-center hidden md:flex gap-5 font-semibold ">
          <Link href="/" > Home </Link>
          <Link href={cartNum ? "/cart" : "#"} > Cart ({" "} {cartNum ? cartNum : 0} {" "}) </Link>
          <Link href="/restaurant" > Add Restaurant  </Link>
          <Link href="/deliveryDashboard" > Delivery Partner   </Link>
          {
            user ? <>
              <Link href="/myprofile" className="text-red-500 underline font-bold "> {user.name} </Link>
              <button onClick={logout} className="p-2 bg-blue-300 rounded-full hover:bg-blue-100 ">  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg></button>
            </> :
              <>
                <Button> <Link href="/user-auth" > Sign Up </Link></Button>
                <Button> <Link href="/user-auth" >Log in </Link></Button>
              </>
          }
        </div>
        <div className="md:hidden items-center gap-3 flex font-bold ">
        <Link href={cartNum ? "/cart" : "#"} > Cart ({" "} {cartNum ? cartNum : 0} {" "}) </Link>
          <Sheet>
            <SheetTrigger>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center ">
                  <img src="../../../Assets/log.jpg" className="size-16" alt="Logo" />
                  <h1>TastyTrails</h1>
                </SheetTitle>
                <SheetDescription>
                  <div className="items-center  flex  flex-col gap-5 font-semibold ">
                    <Link className="text-lg font-semibold " href="/" > Home </Link>
                    <Link className="text-lg font-semibold " href="/restaurant" > Add Restaurant  </Link>
                    <Link className="text-lg font-semibold " href="/deliveryDashboard" > Delivery Partner   </Link>
                    {
                      user ? <>
                        <Link  href="/myprofile" className="text-red-500 underline font-bold text-lg "> {user.name} </Link>
                        <button onClick={logout} className="p-2 bg-blue-300 px-10 rounded-md text-black hover:bg-blue-100 ">  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        </button>
                      </> :
                        <>
                          <Button> <Link href="/user-auth" > Sign Up </Link></Button>
                          <Button> <Link href="/user-auth" >Log in </Link></Button>
                        </>
                    }
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>

  )
}

export default CustomerHeader