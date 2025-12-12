import {Navigate,useLocation} from "react-router-dom"
import { useState,useEffect } from "react"
import Cookies from "js-cookie"
import Navbar from '../Navbar'
import './index.css'
import Productcontex from "../../context/Productcontex"


const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const Products=()=>{
const [activeoptionid,setactiveoptionid]=useState(sortbyOptions[0].optionId)
const [productdata,setproductdata]=useState([])
const [searchprod,setsearchprod]=useState('')
const cookie=Cookies.get('jwt_token')

 const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";
useEffect(()=>{
    const getproducts=async()=>{
const apiurl=`https://apis.ccbp.in/products?sort_by=${activeoptionid}`
const options={
headers:{
Authorization:`Bearer ${cookie}`
},
    method:'GET'
}
const response=await fetch(apiurl,options)
const data=await response.json()
if(response.ok){
    const updatedData = data.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      setproductdata(updatedData)
}
    }
    getproducts()

},[activeoptionid,cookie])
 useEffect(() => {
    if (searchQuery) {
      setsearchprod(searchQuery.toLowerCase());
    }
  }, [searchQuery]);
const change3=event=>{
  setactiveoptionid(event.target.value)
}
const changesearch=event=>{
setsearchprod(event.target.value)
}
if(cookie===undefined)
   return <Navigate to="/login"/>
return(
    <Productcontex.Consumer>
      {value=>{
const {addtocart}=value
const filterdata=productdata.filter(each=>each.title.toLowerCase().includes(searchprod))
     return( 
      <>
    <Navbar/>
    <div className="bgs">
        <div className="sortd">
          
          <input type="search" value={searchprod} onChange={changesearch} placeholder="search"/>
          <select value={activeoptionid} onChange={change3}>
            {sortbyOptions.map(each=>(
              <option key={each.optionId} value={each.optionId}>{each.displayText}</option>
            ))}
          </select>
        </div>
        <div className="r6">
          {filterdata.map(each=>(
            <li key={each.id} className="prod">
          <img src={each.imageUrl} alt="imag" className="im3"/>
          <li className="l1">
          <h7>{each.title}</h7>
          <p>Price:₹{each.price}</p>
          <p>Brand:{each.brand}</p>
           <button className="add-btn" onClick={() => addtocart(each)}>
                Add to Cart
              </button>
              </li>
            </li>
          ))}
        </div>
    </div>
   </>  )}}  
    </Productcontex.Consumer>
)
}

export default Products