import {Submission} from "../0/Submission";

export interface GameProps {
    gameId: number;
}

export interface GameStageProps {
    callback : any;
    target : Submission | undefined;
}