import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, Types } from 'mongoose'
import { Checkbox } from './checkbox.schema'

export type ChecklistDocument = HydratedDocument<Checklist>

@Schema()
export class Checklist {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId

  @Prop()
  userId: string

  @Prop()
  title: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Checkbox' }] })
  checkboxes: Checkbox[]

  @Prop({ default: Date.now })
  createdAt: Date
}

export const ChecklistSchema = SchemaFactory.createForClass(Checklist)

// _id -> id 변환
ChecklistSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})
