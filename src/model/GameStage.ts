import Tutorial from "view/pages/Game/0/Tutorial";
import Submit from "view/pages/Game/0/submit/Submit";
import Check from "view/pages/Game/0/check/Check";
import Show from "view/pages/Game/0/show/Show";
import Play from "view/pages/Game/0/play/Play";
import Result from "view/pages/Game/0/result/Result";
import Ranking from "view/pages/Game/0/ranking/Ranking";
import Done from "view/pages/Game/0/Done";

const Game0Stages = () => ({
  0: null,
  1: null, //Waiting
  2: {component : Tutorial},
  3: {component : Submit},
  4: {component : Check},
  5: {component : Show},
  6: {component : Play},
  7: {component : Result},
  8: {component : Ranking},
  9: {component : Done},
})

const Game1Stages = () => ({
  0 : null
})

export {Game0Stages, Game1Stages};