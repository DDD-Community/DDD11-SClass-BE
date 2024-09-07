import { Schema, model, Types } from 'mongoose'
import { Checkbox } from '../interfaces/checkbox.interface'

// Checkbox 스키마
export const CheckboxSchema = new Schema<Checkbox>({
  checklistId: {
    type: Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true,
  },
  label: { type: String, required: true },
  isCompleted: { type: Number, required: true, default: 0 },
  isMain: { type: Number, required: true, default: 0 },
  orderNo: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const CheckboxModel = model<Checkbox>('Checkbox', CheckboxSchema)
