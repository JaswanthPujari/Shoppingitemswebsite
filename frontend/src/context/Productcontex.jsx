import React from "react";

const Productcontex=React.createContext({
    addtocart:()=>{},
    cartitems:[],
    increase:()=>{},
    decrease:()=>{},
    remove1:()=>{}
})

export default Productcontex