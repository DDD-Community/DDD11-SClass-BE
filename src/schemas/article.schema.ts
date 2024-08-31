import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

export type ArticleDocument = HydratedDocument<Article>

@Schema()
export class Article {
  @Prop({ type: Types.ObjectId })
  _id: string

  id: string
  @Prop()
  category: string
  @Prop()
  postDate: Date
  @Prop()
  source: string
  @Prop()
  title: string
  @Prop()
  thumbnail: string
  @Prop()
  url: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article)

// _id -> id
ArticleSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    doc.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})
