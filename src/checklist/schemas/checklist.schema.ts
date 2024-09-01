import { Schema, model, Types } from 'mongoose';
import { Checklist } from '../interfaces/checklist.interface';

// Checklist 스키마
export const ChecklistSchema = new Schema<Checklist>({
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  checkboxes: [{ type: Schema.Types.ObjectId, ref: 'Checkbox' }],
});

export const ChecklistModel = model<Checklist>('Checklist', ChecklistSchema);