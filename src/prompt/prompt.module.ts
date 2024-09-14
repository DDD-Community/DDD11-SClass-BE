import { Module } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { PromptController } from './prompt.controller';
import { DbModule } from '../db/db.module';
import { ChecklistService } from '../checklist/checklist.service';

@Module({
  imports: [DbModule],
  controllers: [PromptController],
  providers: [PromptService, ChecklistService],
})
export class PromptModule {}
