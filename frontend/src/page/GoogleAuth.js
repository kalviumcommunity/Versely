import React, {useState, useEffect,useContext} from 'react'
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
const GoogleAuth = () => {


  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const handleCallbackResponse = async (response)=>{

    const fetchdata = await fetch(process.env.REACT_APP_API+"api/user/auth/googleauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: response.credential,
      }),
    });
    const jsondata = await fetchdata.json();
  
    localStorage.setItem("jwt", jsondata.jwtoken);
    localStorage.setItem("user", JSON.stringify(jsondata.user));
    dispatch({ type: "USER", payload: jsondata.user });
    navigate('/')
    setLoading(false)
  }
    useEffect(() => {
      /* global google */
     google.accounts.id.initialize({
        client_id:
          "12511528119-00kpb21f635ujf6h26ndva06af3lgcm9.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("signindiv"),
         {
        theme: "outline",
        size: "large",
      }
      );
    },[]);
  

  return (
    <div
    style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection:"column"
    }}
  > 
    <div id="signindiv"></div>
  </div>
  )
}

export default GoogleAuth
