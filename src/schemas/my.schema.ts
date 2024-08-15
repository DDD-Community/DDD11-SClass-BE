import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

export type CatDocument = HydratedDocument<Cat>

@Schema()
export class Cat {
  @Prop({ type: Types.ObjectId })
  _id: string
  @Prop()
  name: string
}

export const CatSchema = SchemaFactory.createForClass(Cat)

// id -> _id
CatSchema.pre('save', function (next) {
  if (this.id) {
    this._id = this.id
    delete this.id
  }
  next()
})

// _id -> id
CatSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

// CatSchema.set('toObject', {
//   transform: (doc, ret) => {
//     ret._id2 = ret.id
//     delete ret.id
//     return ret
//   },
// })

// CatSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret._id3 = ret.id
//     delete ret.id
//     return ret
//   },
// })
