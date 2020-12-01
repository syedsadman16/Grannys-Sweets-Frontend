import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function CustomerInfo() {

    const [info, setInfo] = useState([]);
    const id = useSelector(({ user }) => user.id);
    const url = '/users/'+id;


    useEffect( () => {
        async function loadUserInfo() {
            const userinfo = await axios.get(url);
            setInfo(userinfo.data);
            return userinfo;
          }
          loadUserInfo();
    }, [url]);



    return (
        <div>

            <h1> {console.log(info)} </h1>
        </div>
    )
}
export default CustomerInfo;