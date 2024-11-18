import React, {useCallback, useEffect, useState} from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import LoginProvider from "../../context/login/LoginContext";


function Root(){

    const [isLogin, setIsLogin] = useState(false);
    const [partyId, setPartyId] = useState(-1);
    const [memberName, setMemberName] = useState("");
    const [userId, setUserId] = useState(-1);

    useEffect(()=>{
    },[]);

    const handleLogin = useCallback ((data : boolean, partyId: number, loginId: number, loginName :string)=> {
        setIsLogin(data);
        setPartyId(partyId);
        setMemberName(loginName);
        setUserId(loginId);
    },[isLogin]);

    const handleLogout = useCallback (()=> {
        setIsLogin(false);
    }, [isLogin])

    return (
        <div className="Root">
            <div className="h-screen from-sky-100 via-sky-300 to-blue-200 bg-gradient-to-br">
                    {isLogin?
                        <LoginProvider>
                        <Home logOut={handleLogout} partyId={partyId} userId={userId} userName={memberName} />
                        </LoginProvider>
                        :
                        <Login rootCall={handleLogin}/>}

            </div>
        </div>
    );
}


export default Root;