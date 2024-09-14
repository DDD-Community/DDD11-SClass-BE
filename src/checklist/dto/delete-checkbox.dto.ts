export namespace DeleteCheckboxDto {
  req: Request
  req: Response
  export interface Req {
    checkboxIds: string[] 
  }
  export interface Res {
    deletedIds: string[]
    deletedCount: number
  }
}
