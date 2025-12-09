import {Link,useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import './index.css'
import Productcontex from "../../context/Productcontex"

const Header=()=>{
    const navigate=useNavigate()
const logout=()=>{
Cookies.remove("jwt_token")
navigate("/login")
}
    return(
        <Productcontex.Consumer>
            {value=>{
                const {cartitems}=value
                return(
 <div className="bg2">
        
        <Link to="/">
        <img src="https://download.logo.wine/logo/React_(web_framework)/React_(web_framework)-Logo.wine.png" className="im1" alt="logo"/>
        </Link>
        <div className="r2">
            <Link to="/" className="navl">
            <li>Home</li>
            </Link>
            <Link to="/products" className="navl">
            <li>Products</li>
            </Link>
            <Link to="/cart" className="navl">
            <li>Cart
                {cartitems.length>0?<span className="c2">{cartitems.length}</span>:''}
            </li>
            </Link>
            <button type="button" onClick={logout} className="bt1">Logout</button>
        </div>
    </div>
                )
            }}
        </Productcontex.Consumer>
   )
}

export default Header