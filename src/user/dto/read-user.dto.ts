export namespace ReadUserDto {
  res: Response
  export interface Res {
    id: string
    nickname: string
    job: 'designer' | 'devloper' | 'project_manager'
    workExperience: number
  }
}
