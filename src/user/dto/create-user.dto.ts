export namespace CreateUserDto {
  req: Request
  export interface Req {
    id: string
    nickname: string
    job: 'designer' | 'devloper' | 'project_manager'
    workExperience: number
  }
}
