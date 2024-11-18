import React, {useCallback, useContext, useEffect, useState} from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import PartyProvider from "../../context/party/PartyContext";
import {LoginContext} from "../../context/login/LoginContext";



function Root(){
    const loginContext = useContext(LoginContext);

    if (!loginContext) {
        throw new Error ("Root has to be in LoginContext");
    }
    const {login, setLogin} = loginContext;
    const [partyId, setPartyId] = useState(-1);
    const [memberName, setMemberName] = useState("");
    const [userId, setUserId] = useState(-1);

    const handleLogin = useCallback ((loginName :string, partyId: number, loginId: number, )=> {
        setPartyId(partyId);
        setMemberName(loginName);
        setUserId(loginId);
        setLogin(true);
    },[setLogin]);

    useEffect(() => {
    }, [login]);

    return (
        <div className="Root">
            <div className="h-screen from-sky-100 via-sky-300 to-blue-200 bg-gradient-to-br">
                    {login?
                        <PartyProvider>
                            <Home partyId={partyId} userId={userId} userName={memberName} />
                        </PartyProvider>
                        :
                        <Login rootCall={handleLogin}/>}
            </div>
        </div>
    );
}


export default Root;