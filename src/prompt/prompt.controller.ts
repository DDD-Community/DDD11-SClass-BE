import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { TypedBody } from '@nestia/core';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import axios from 'axios';
import { Dto } from '../app.dto';
import { ChecklistService } from '../checklist/checklist.service';
import { CreateCheckboxDto } from '../checklist/dto/create-checkbox.dto';
import { CreateChecklistDto } from '../checklist/dto/create-checklist.dto';
import { children, last } from 'cheerio/dist/commonjs/api/traversing';
import { coerceBoolean } from 'openai/core';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService,private readonly checklistService: ChecklistService) {}

    /**
   * sample description
   * @summary 체크리스트 생성 
   * @returns sample return
   * @tag Prompt 프롬프트
   */
  @Post()
  async get(@Body() req: CreatePromptDto.Req): Promise<Dto<CreatePromptDto.Res>> {
    const checklist = await this.promptService.get(req);
    return {data: {checklist:checklist, checklistId:null}}
  }
    /**
   * sample description
   * @summary 체크리스트 생성 후 저장 
   * @returns sample return
   * @tag Prompt 프롬프트
   */
  @Post('/save')
  async create(@TypedBody() req: CreatePromptDto.Req): Promise<Dto<CreatePromptDto.Res>> {
    const checklist = await this.promptService.create(req);
    const req1 = new CreateChecklistDto()
    req1.userId = req.userId
    req1.orderNo = 1
    const res2 = await this.checklistService.createChecklist(req1)
    for (const checkbox of checklist) {
      const req2 = new CreateCheckboxDto()
      req2.checklistId = res2.id
      req2.label = checkbox
      req2.userId = req.userId
      const res3 = await this.checklistService.createCheckbox(req2)
    }
    return {data: {
      checklistId: res2.id,
      checklist: checklist,
    }}
  }

}
