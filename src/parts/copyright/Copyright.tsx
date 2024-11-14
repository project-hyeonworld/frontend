import React, {useEffect, useState} from 'react';



function Copyright (){
    const [year, setYear] = useState(0);

    useEffect(()=>{
        const d = new Date();
        setYear(d.getFullYear());
    },[])

    return (
        <div className="Copyright">
                <p  className="text" style={{'color' : "#a5a9aa" }}>© HyseonwoORld v0.8 {year}</p>

        </div>
    );
}
export default Copyright;