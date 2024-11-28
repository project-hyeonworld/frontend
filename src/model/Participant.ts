export interface Participant {
    id: number;
    score: number;
}

export interface ParticipantWithName extends Participant {
    name: string;
}