import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
function Protected({children,authentication=true}) {
    const status = useSelector(state=>state.auth.status);
    const [loader,setLoader]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        if(authentication && status!==authentication){
            navigate('/login');
        }
        else if(!authentication && status !=authentication){
            navigate('/');
        }
        setLoader(false);

    },[authentication,status,navigate])
    return  loader ? <div>Loading...</div> : <>{children}</>

}

export default Protected