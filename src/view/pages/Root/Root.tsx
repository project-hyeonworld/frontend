import React, {useCallback, useState} from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import PartyProvider from "context/party/PartyContext";
import {useLoginContext} from "context/login/LoginContext";



function Root(){
    const loginContext = useLoginContext("Root");
    const [partyId, setPartyId] = useState<number>();
    const [memberName, setMemberName] = useState("");
    const [userId, setUserId] = useState(-1);

    const {login, setLogin} = loginContext;

    const handleLogin = useCallback ((loginName :string, partyId: number|null, loginId: number, )=> {
        if (partyId !== null) {
            setPartyId(partyId);
            setMemberName(loginName);
            setUserId(loginId);
            setLogin(true);
        }
    },[]);

    return (
        <div className="Root">
            <div className="h-screen from-sky-100 via-sky-300 to-blue-200 bg-gradient-to-br">
                    {login?
                        <PartyProvider>
                            <Home partyId={Number(partyId)} userId={userId} userName={memberName} />
                        </PartyProvider>
                        :
                        <Login rootCall={handleLogin}/>}
            </div>
        </div>
    );
}


export default Root;