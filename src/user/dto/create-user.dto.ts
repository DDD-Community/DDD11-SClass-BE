export namespace CreateUserDto {
  req: Request
  export interface Req {
    id: string
    nickname: string
    job: 'designer' | 'developer' | 'planner'
    workExperience: number
  }
}
