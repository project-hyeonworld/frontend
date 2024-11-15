import React, {useCallback, useContext, useState} from 'react';
import LoginAxios from './LoginAPI';
import Copyright from "../../parts/copyright/Copyright";
// @ts-ignore
import styles from './Login.css';
import {PartyContext} from "../../context/party/PartyContext";

interface LoginProps{
    rootCall: (login : boolean,
               loginId: number,
               loginName: string,
    ) => void;
}

function Login (props : LoginProps){
    const partyContext = useContext(PartyContext);
    const [inputName, setInputName] = useState('');

    const handleInputName = (event : React.ChangeEvent<HTMLInputElement>) =>{
        setInputName(event.target.value)
    }

    if (!partyContext) {
        throw new Error('Counter must be used within a LoginProvider');
    }
    const {partyId, setPartyId} = partyContext;

    const onClickLogin = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        function checkSuccess(status : number) {
            let userId = status;
            let partyId = 2;
            switch (status){
                case 404:
                    console.log("There is no member called" + inputName);
                    break;
                case 409:
                    console.log("IS already Logged in");
                    break;
                default :
                    setPartyId(partyId);
                    props.rootCall(true, userId, inputName);
                    break;
            }
        }

        LoginAxios (inputName, checkSuccess);
        // fetch('/onLogin')
        //     .then((res) => res.json())
        //     .then (data=>{setData(data); console.log("THIS : ",data.last)}, ()=>{console.log ("THAT : ",data)})
        //     .catch(err => console.log("fcc",err))
        //postLogin()


    }

    return (
        <div>
            <div className="Login">
                <div className="h-screen">
                    <ul className="p-20 space-y-0"/>
                    <div className="rounded-lg bg-blue-200 p-10">
                        <div className="grid grid-cols-1">
                            <input  className="form-control text-1xl p-4" id="floatingInput" placeholder='성함을 입력해주세요' value={inputName} onChange={handleInputName}></input>
                            <ul className="p-5 space-y-10"/>
                            <button className="py-2 px-4 rounded-3xl shadow-md text-white bg-blue-500 hover:bg-blue-700" type="submit" onClick={onClickLogin}>로그인</button>
                        </div>
                        <Copyright/>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Login;