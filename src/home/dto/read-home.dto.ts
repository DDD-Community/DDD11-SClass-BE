import { Article } from 'src/schemas/article.schema'

export namespace ReadHomeDto {
  res: Response
  export interface Res {
    articles: {
      id: string
      category: string
      postDate: Date 
      source: string 
      title: string
      thumbnail: string
      url: string
    }[]
  }
}
