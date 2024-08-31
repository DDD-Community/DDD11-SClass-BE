export namespace CreateUserDto {
  req: Request
  export interface Req {
    userId: string
    nickname: string
    job: 'designer' | 'developer' | 'planner'
    workExperience: number
  }
}
