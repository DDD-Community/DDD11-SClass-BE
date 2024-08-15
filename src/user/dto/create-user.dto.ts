export namespace CreateUserDto {
  req: Request
  export interface Req {
    id: string
    nickname: string
    job: 'designer' | 'developer' | 'project_manager'
    workExperience: number
  }
}
