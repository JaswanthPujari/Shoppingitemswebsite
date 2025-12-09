import {Navigate} from "react-router-dom"
import Cookies from "js-cookie"
import Navbar from '../Navbar'
import './index.css'

const Home=()=>{
const cookie=Cookies.get('jwt_token')
if(cookie===undefined)
  return <Navigate to="/login"/>
return(
    <>
    <Navbar/>
    <div className="bgr">
        <h1>Welcome to Home page</h1>
    </div>
    </>
)
}

export default Home