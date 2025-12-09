import Productcontex from "../../context/Productcontex";
import Navbar from "../Navbar"
import {Link} from "react-router-dom"
import './index.css'

const Cart=()=>(
    <Productcontex.Consumer>
        {value=>{
 const {cartitems,increas,decreas,remove1}=value
 const totalamount=cartitems.reduce((s,i)=>s+i.price*i.qty,0)
        return(
            <>
            <Navbar/>
            {cartitems.length>0?
<div className="r0">
    {cartitems.map(each=>(
        <li key={each.id} className="prod2">
 <img src={each.imageUrl} alt="imag" className="im3"/>
          <h7>{each.title}</h7>
          <p>Price:₹{each.qty*each.price}</p>
          <p>Brand:{each.brand}</p>
          <div className="r8">
             <button type="button" onClick={()=>decreas(each.id)} className="bu1">-</button>
            <p>{each.qty}</p>
           
            <button type="button" onClick={()=>increas(each.id)} className="bu1">+</button>
          </div>
          <button type="button" onClick={()=>remove1(each.id)} className="bt1">Remove</button>
        </li>
    ))}
    <h1>Total Amount in cart:{totalamount}</h1>
    
</div>:<div>
    <h1>Your cart is empty</h1>
    <Link to="/products">
    <button className="bt1">Continue shopping</button>
    </Link>
    </div>}
</>
        )
        }}
       
    </Productcontex.Consumer>
)

export default Cart