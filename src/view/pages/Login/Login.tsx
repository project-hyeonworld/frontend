import React, {useCallback, useContext, useState} from 'react';
import LoginAxios from './LoginAPI';
import Copyright from "view/parts/copyright/Copyright";
// @ts-ignore
import styles from './Login.css';

interface LoginProps{
    rootCall: (loginName: string,
               partyId: number,
               loginId: number,
    ) => void;
}

function Login (props : LoginProps){
    const [inputName, setInputName] = useState('');

    const handleInputName = (event : React.ChangeEvent<HTMLInputElement>) =>{
        setInputName(event.target.value)
    }



    const onClickLogin = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        function checkSuccess(data : any) {
            props.rootCall(inputName, data.partyId, data.userId);
        }

        function checkFail(status : number) {
            switch (status){
                case 404:
                    console.log("There is no member called" + inputName);
                    break;
                case 409:
                    console.log("IS already Logged in");
                    break;
            }
        }
        LoginAxios (inputName, checkSuccess, checkFail);
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