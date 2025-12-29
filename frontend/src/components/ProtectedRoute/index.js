import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

const ProtectedRoute=({children})=>{
const cookie=Cookies.get('jwt_token')
if(cookie===undefined)
    return <Navigate to="/login"/>
   return children 
}

export default ProtectedRoute