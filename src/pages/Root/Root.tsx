import React, {useCallback, useEffect, useState} from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import PartyProvider from "../../context/party/PartyContext";


function Root(){

    const [isLogin, setIsLogin] = useState(false);
    const [memberName, setMemberName] = useState("");
    const [memberId, setMemberId] = useState(-1);

    useEffect(()=>{
    },[]);

    const handleLogin = useCallback ((data : boolean, loginId: number, loginName :string)=>{
        setIsLogin(data);
        setMemberName(loginName);
        setMemberId(loginId);
    },[isLogin]);

    return (
        <div className="Root">
            <div className="h-screen from-sky-100 via-sky-300 to-blue-200 bg-gradient-to-br">
                <PartyProvider>
                    {isLogin? <Home rootCall={handleLogin} userId={memberId} name={memberName} />:
                        <Login rootCall={handleLogin}/>}
                </PartyProvider>
            </div>
        </div>
    );
}


export default Root;