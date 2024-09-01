import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { ChecklistSchema } from './schemas/checklist.schema';
import { CheckboxSchema } from './schemas/checkbox.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Checklist', schema: ChecklistSchema },
      { name: 'Checkbox', schema: CheckboxSchema },
    ]),
  ],
  controllers: [ChecklistController],
  providers: [ChecklistService],
  exports: [ChecklistService],
})
export class ChecklistModule {}