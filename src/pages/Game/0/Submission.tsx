export interface Submission{
    name: string
    textList: string[]
}

export interface SubmissionAdmin extends Submission{
    number: number,
}