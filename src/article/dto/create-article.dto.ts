export namespace CreateArticleDto {
  res: Response
  export interface Metadata {
    urls: string[]
    thumbnails: string[]
    titles: string[]
  }
  export interface Res {
    inserted: number
  }
}
