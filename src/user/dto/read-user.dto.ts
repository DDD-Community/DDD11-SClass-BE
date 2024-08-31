export namespace ReadUserDto {
  res: Response
  export interface Res {
    userId: string
    nickname: string
    job: 'designer' | 'devloper' | 'planner'
    workExperience: number
  }
}
