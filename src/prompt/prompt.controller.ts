import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { TypedBody } from '@nestia/core';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import axios from 'axios';
import { Dto } from 'src/app.dto';

@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

    /**
   * sample description
   * @summary 체크리스트 생성 
   * @returns sample return
   * @tag Prompt 프롬프트
   */
  @Post()
  async create(@TypedBody() req: CreatePromptDto.Req): Promise<Dto<CreatePromptDto.Res>> {
    const res = await this.promptService.create(req);
    return {data: res}
  }

  // @Get()
  // findAll() {
  //   return this.promptService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.promptService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePromptDto: UpdatePromptDto) {
  //   return this.promptService.update(+id, updatePromptDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.promptService.remove(+id);
  // }
}
