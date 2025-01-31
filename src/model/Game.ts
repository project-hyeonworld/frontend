import Game0 from "view/pages/Game/0/Game0Main";
import Game1 from "view/pages/Game/1/Game1Main";
import Game2 from "view/pages/Game/2/Game2Main";
import Game3 from "view/pages/Game/3/Game3Main";
import Game4 from "view/pages/Game/4/Game4Main";
import Game5 from "view/pages/Game/5/Game5Main";

export interface GameModel {
  id : number;
  name: string;
  description: string;
}

export const GameComponent = {
  "진실 혹은 거짓": Game0,
  "무작위 세 단어": Game1,
  "소수결 게임": Game2,
  "퀴즈퀴즈": Game3,
  "떡 먹은 현우 찾기": Game4,
  "선택지 게임": Game5,
}