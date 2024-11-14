import React, {useEffect, useState} from 'react';

import {GameProps} from "../GameProps/GameProps";




function Game6(props : GameProps) {
    // IP주소 변수 선언


    useEffect(()=>{

    },[])

    const [id, setId] = useState(()=>{
        console.log ("Game의 id useState() 호출");
        return "";
    });



    return (
        <div className="Game0">

            <p>5</p>
            </div>
    );
}



export default Game6;