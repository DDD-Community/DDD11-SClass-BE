import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CheckboxDocument = HydratedDocument<Checkbox>;

@Schema()
export class Checkbox {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Checklist' })
  checklistId: string;

  @Prop()
  label: string;

  @Prop({ default: 0 })
  isCompleted: number;

  @Prop({ default: 0 })
  isMain: number;

  @Prop()
  orderNo: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CheckboxSchema = SchemaFactory.createForClass(Checkbox);

CheckboxSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});