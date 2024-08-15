import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  _id: string
  @Prop()
  name: string
}

export const UserSchema = SchemaFactory.createForClass(User)

// id -> _id
UserSchema.pre('save', function (next) {
  if (this.id) {
    this._id = this.id
    delete this.id
  }
  next()
})

// _id -> id
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

// UserSchema.set('toObject', {
//   transform: (doc, ret) => {
//     ret._id2 = ret.id
//     delete ret.id
//     return ret
//   },
// })

// UserSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret._id3 = ret.id
//     delete ret.id
//     return ret
//   },
// })
