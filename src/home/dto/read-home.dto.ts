import { Article } from 'src/schemas/article.schema'

export namespace ReadHomeDto {
  res: Response
  export interface Res {
    articles: {
      id: string
      category: string 
      title: string
      from: string 
      date: string 
      thumnail: string 
      url: string 
    }[]
  }
}
