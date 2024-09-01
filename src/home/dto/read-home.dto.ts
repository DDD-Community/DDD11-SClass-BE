export namespace ReadHomeDto {
  res: Response
  export interface Res {
    articles: {
    articleId: string
    category: string
    postDate: Date
    source: string
    title: string
    thumbnail: string
    url: string
    }[]
  }
}
