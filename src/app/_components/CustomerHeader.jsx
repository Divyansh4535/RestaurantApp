"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

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
    <div className="bg-cyan-900 text-cyan-100 shadow-md shadow-cyan-100 h-20 w-full flex items-center ">
      <nav className='flex items-center justify-between w-full h-10 px-5 '>
        <div> logo</div>
        <div className="flex gap-5 font-semibold ">
          <Link href="/" > Home </Link>
          <Link href={cartNum ? "/cart" : "#"} > Cart ({" "} {cartNum ? cartNum : 0} {" "}) </Link>
          {

            user ? <>
              <li > <Link href="/myprofile"> {user.name} </Link></li>
              <button onClick={logout}> LogOut</button>
            </> :
              <>
                <Link href="/user-auth" > Login </Link>
                <Link href="/user-auth" > Sign Up </Link>
              </>
          }
          <Link href="/" > Add Restaurant  </Link>
          <Link href="/deliveryDashboard" > Delivery Partner   </Link>
        </div>
      </nav>
    </div>

  )
}

export default CustomerHeader