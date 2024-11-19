import {useState, useEffect } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css';
import customAxios from './customAxios';

import Root from './view/pages/Root/Root';
import Game from './view/pages/Game/Game';
import LoginProvider from "./context/login/LoginContext";

function App() {
  // IP주소 변수 선언
  const [ip, setIp] = useState('');

  // IP주소 값을 설정합니다.
  function callback(data) {
    setIp(data);
  }

  // 첫번째 렌더링을 다 마친 후 실행합니다.
  useEffect(
      () => {
        // 클라이언트의 IP주소를 알아내는 백엔드의 함수를 호출합니다.
        //customAxios('/ip', callback);
      }, []
  );

  return (

      <div className="App">
        <div className={"container"}>
          <LoginProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Root />}/>
                <Route path="/game" element={<Game />}/>
              </Routes>
            </BrowserRouter>
          </LoginProvider>
        </div>
        {/*</header>*/}


      </div>
  );
}
export default App;