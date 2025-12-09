import { useState } from "react";
import {useNavigate} from "react-router-dom"
import Cookies from 'js-cookie'
import './index.css'

const Login=()=>{
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [iserrmsg,setiserrmsg]=useState('')
    const [errmsg,seterrmsg]=useState('')
    const navigate=useNavigate()

    const change1=event=>{
        setusername(event.target.value)
    }
    const change2=event=>{
        setpassword(event.target.value)
    }
    const submitsuccess=(jwtToken)=>{
Cookies.set("jwt_token",jwtToken,{expires:30})
navigate("/")
    }
    const submitform=async(event)=>{
        event.preventDefault()
        const userdetails={username,password}
        const url='https://apis.ccbp.in/login'
        const options={
            method:'POST',
            body:JSON.stringify(userdetails)
        }
        const response=await fetch(url,options)
        const data=await response.json()
        if(response.ok){
            submitsuccess(data.jwt_token)
        }
        else{
            setiserrmsg(true)
            seterrmsg(data.error_msg)
        }
    }
    return(
        <div className="bg">
            <form className="form1" onSubmit={submitform}>
                <label>Username:</label>
                <input type="text" value={username} placeholder="username" onChange={change1}/>
                <label>Password:</label>
                <input type="password" value={password} placeholder="password" onChange={change2}/>
                <button type="submit" className="bt3">Login</button>
                {iserrmsg && <p>{errmsg}</p>}
            </form>
        </div>
    )
}
export default Login