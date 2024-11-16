import {Submission} from "../0/Submission";

export interface GameProps {
    userId: number;
    memberName: string;
    gameId: number;
    stage: number;
}

export interface GameStageProps {
    userId: number;
    callback : any;
    target : Submission | undefined;
}