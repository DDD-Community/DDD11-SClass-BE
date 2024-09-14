import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import {ListOutputParser} from '@langchain/core/output_parsers'
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PromptService {
  async get(req: CreatePromptDto.Req):Promise<string[]> {
    const prompt = ChatPromptTemplate.fromTemplate(`
      You are a professional who extracts key keywords from the text. Please extract the keyword ~ from the following examples in English:

      Examples:
      1. "~에 체크리스트를 만들어줘" → Extracted Keyword: ~
      2. "~는 어떻게 하는게 좋을까" → Extracted Keyword: ~
      3. "~알려줘" → Extracted Keyword: ~

      Now, extract the keyword from the following question:

      질문: "{question}"
      
      키워드: 
      `
  );
  const llm = new ChatOpenAI({temperature:1});
  const chain = prompt.pipe(llm);
  const answer = await chain.invoke({ question: req.question});
  console.log(`keword=${answer.content}`);
  const answer2 = await sendRequest(answer.content, req.question);

    return answer2
  }
  async create(req: CreatePromptDto.Req):Promise<string[]> {
    const prompt = ChatPromptTemplate.fromTemplate(`
      You are a professional who extracts key keywords from the text. Please extract the keyword ~ from the following examples in English:

      Examples:
      1. "~에 체크리스트를 만들어줘" → Extracted Keyword: ~
      2. "~는 어떻게 하는게 좋을까" → Extracted Keyword: ~
      3. "~알려줘" → Extracted Keyword: ~

      Now, extract the keyword from the following question:

      질문: "{question}"
      
      키워드: 
      `
  );
  const llm = new ChatOpenAI({temperature:1});
  const chain = prompt.pipe(llm);
  const answer = await chain.invoke({ question: req.question});
  console.log(`keword=${answer.content}`);
  const answer2 = await sendRequest(answer.content, req.question);

    return answer2
  }

}

async function sendRequest(keyword, question: string):Promise<string[]> {
   // 체크리스트 생성 프롬프트 템플릿
   const template = `
   Provide a comma-separated list of exactly ten checklist items in Korean for the following question:
   "{question}"
   Each item should be directly related to the topic, simple, and clear. Make sure there are exactly 10 items in the list, no more, no less.
   `;
 
   const prompt = new PromptTemplate({
     template,
     inputVariables: ['question'],
   });
 
   // LLM 설정
   const llm = new ChatOpenAI({
     temperature: 0.7,
     modelName: 'gpt-4',
   });

   const finalPrompt = await prompt.format({ question });
   const output = await llm.invoke(finalPrompt);

   // 체크리스트 파싱 및 검증
   
   // 파싱 함수 (커스텀 구현)
   const parseChecklist = (output: string) => {
     const items = output.split(',').map((item) => item.trim());
     
     // 정확히 10개의 항목이 있는지 확인
     if (items.length !== 10) {
       throw new Error(`Checklist must contain exactly 10 items. Found ${items.length} items.`);
      }
      return items
    }
    const checklist = parseChecklist(output.content as string);
    return checklist
}
