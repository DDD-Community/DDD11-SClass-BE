export namespace CreatePromptDto {
    req: Request
    export interface Req {
      userId: string
      question: string
    }
    res: Response
    export interface Res {
        checklistId: string|null
        checklist: string[]
    }
  }
  