import React, {useState, useEffect, useRef} from 'react'
import Keycloak from "keycloak-js"

const useAuth = () => {
  const isRun= useRef(false)
  const [isLoggedIn, setIsLoggedIn] =useState(false);


  useEffect(() => {

    if(isRun.current) return;
    isRun.current = true;
    const client = new Keycloak({
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
    })


    client.init({
        onLoad:"login-required"
    }).then((res)=>{
        setIsLoggedIn(res)
    })


  }, []);
  return isLoggedIn;
// useEffect(()=>{
//   window.location.href = "http://localhost:5173"
// },[])
}

export default useAuth