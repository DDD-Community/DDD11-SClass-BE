export namespace ReadHomeDto {
  res: Response
  export interface Res {
    articles: Article[]
  }
  export interface Article {
    articleId: string
    category: string
    postDate: Date
    source: string
    title: string
    thumbnail: string
    url: string
  }
}
