import React from 'react';


const ConfirmModal = ({onConfirm,value}: { onConfirm: (arg0 : boolean) => void, value: string } ) => {



    return (
        <div className={"h-screen w-full fixed left-0 top-0 flex justify-center bg-black bg-opacity-70"}>
            <div className={"py-2 px-4 bg-white fixed bottom-1/3 rounded-2xl w-10/12 h-1000"} key={12}>
                <p>'{value}'</p>
                <p>명제가 거짓 맞습니까?</p>
                    <button onClick={()=>onConfirm(true)} className={"py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-2xl text-white mr-3"}>네</button>
                    <button onClick={()=>onConfirm(false)} className={"py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-2xl text-white"}>아니오</button>
            </div>
        </div>
    )
}

export default ConfirmModal;