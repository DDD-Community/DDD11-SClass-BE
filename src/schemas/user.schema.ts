import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  _id: string
  @Prop()
  nickname: string
  @Prop()
  job: 'designer' | 'devloper' | 'planner'
  @Prop()
  workExperience: number
}

export const UserSchema = SchemaFactory.createForClass(User)

// _id -> id
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

