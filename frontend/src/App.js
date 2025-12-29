import Home from "./components/Home"
import Products from "./components/Products"
import Productcontex from "./context/Productcontex"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Cart from "./components/Cart"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useState,useEffect } from "react"

const App=()=>{
const [cartitems,setcartitems]=useState([])
const remove1=async(id)=>{
  await fetch(`https://shoppingitemswebsite.onrender.com/cart/del/${id}`,{method:"DELETE"})
  getcart()
}
const getcart=async()=>{
const url=`https://shoppingitemswebsite.onrender.com/cart`
const response =await fetch(url)
const data=await response.json()
setcartitems(data)
}
 useEffect(()=>{
getcart();
},[])
const increas=async(id)=>{
  await fetch(`https://shoppingitemswebsite.onrender.com/cart/inc/${id}`,{method:"PUT"})
getcart()
}
const decreas=async(id)=>{
 await fetch(`https://shoppingitemswebsite.onrender.com/cart/dec/${id}`,{method:"PUT"})
getcart()
}
const addToCart=async(item)=>{
  
  await fetch("https://shoppingitemswebsite.onrender.com/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id:item.id,title:item.title,price:item.price,imageUrl:item.imageUrl,brand:item.brand})
  });
getcart()
}
  return(
  <Productcontex.Provider value={{addtocart:addToCart,cartitems,increas:increas,decreas:decreas,remove1:remove1}}>
<BrowserRouter>
<Routes>
  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
  <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>}/>
  <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
  <Route path="/login" element={<Login />}/>
</Routes>
</BrowserRouter>
</Productcontex.Provider>
)
}
export default App