import {Submission} from "../0/Submission";

export interface GameProps {
    memberId: number;
    memberName: string;
    gameId: number;
    stage: number;
}

export interface GameStageProps {
    memberId: number;
    callback : any;
    target : Submission | undefined;
}