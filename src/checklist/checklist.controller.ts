import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { ChecklistService } from './checklist.service'
import { CreateChecklistDto } from './dto/create-checklist.dto'
import { CreateCheckboxDto } from './dto/create-checkbox.dto'
import { UpdateCompletedDto } from './dto/update-completed.dto'
import { UpdateOrderNoDto } from './dto/update-orderNo.dto'
import { UpdateIsMainDto } from './dto/update-isMain.dto'
import { ApiTags } from '@nestjs/swagger'
import { UpdateTitleDto } from './dto/update-checklist.dto'
import { Dto } from '../app.dto'
import { Checkbox, Res as CheckboxRes } from './interfaces/checkbox.interface'
import { Res as ChecklistRes } from './interfaces/checklist.interface'
import { Checklist } from './interfaces/checklist.interface'

@ApiTags('Checklist')
@Controller('checklists')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Get()
  async findByUser(@Query('userId') userId: string): Promise<Dto<ChecklistRes>> {
    const res = await this.checklistService.findByUser(userId)
    return { data: {checklists: res} }
  }

  @Post()
  async createChecklist(
    @Body() createChecklistDto: CreateChecklistDto,
  ): Promise<Dto<Checklist>> {
    const res = await this.checklistService.createChecklist(createChecklistDto)
    return { data: res }
  }

  /**
   * sample description
   * @summary 체크리스트 프로젝트 제목변경
   * @returns sample return
   */
  @Patch(':checklistId')
  async updateTitle(
    @Param('checklistId') checklistId: string,
    @Body() req: UpdateTitleDto.Req,
  ): Promise<Dto<object>> {
    const res = await this.checklistService.updateChecklistTitle(
      checklistId,
      req.title,
    )
    return { data: {} }
  }

  /**
   * sample description
   * @summary 체크리스트 프로젝트 삭제
   * @returns sample return
   */
  @Delete(':checklistId')
  async deleteChecklist(
    @Param('checklistId') checklistId: string,
  ): Promise<Dto<object>> {
    const message = await this.checklistService.deleteChecklist(checklistId)
    return { data: {} }
  }

  @Get(':checklistId/checkboxes')
  async getCheckboxes(@Param('checklistId') checklistId: string): Promise<Dto<CheckboxRes>> {
    const res = await this.checklistService.getCheckboxesByChecklistId(checklistId)
    return {data: {checkboxes: res}}
  }

  @Post(':checklistId/checkboxes')
  async createCheckbox(
    @Param('checklistId') checklistId: string,
    @Body() createCheckboxDto: CreateCheckboxDto,
  ): Promise<Dto<object>> {
await this.checklistService.createCheckbox({
      ...createCheckboxDto,
      checklistId,
    })
    return {data: {}}
  }

  @Patch(':checklistId/checkboxes/:id/completed')
  async updateCompleted(
    @Param('checklistId') checklistId: string,
    @Param('id') id: string,
    @Body() update: UpdateCompletedDto,
  ): Promise<Dto<object>> {
    await this.checklistService.updateCompleted(checklistId, id, update)
    return {data: {}}
  }

  @Patch(':checklistId/checkboxes/:id/order')
  async updateOrderNo(
    @Param('checklistId') checklistId: string,
    @Param('id') id: string,
    @Body() update: UpdateOrderNoDto,
  ): Promise<Dto<object>> {
    await this.checklistService.updateOrderNo(checklistId, id, update)
    return {data: {}}
  }

  @Patch(':checklistId/checkboxes/:id/main')
  async updateIsMain(
    @Param('checklistId') checklistId: string,
    @Param('id') id: string,
    @Body() update: UpdateIsMainDto,
  ): Promise<Dto<object>>  {
    await this.checklistService.updateIsMain(checklistId, id, update)
    return {data: {}}
  }

  @Delete(':checklistId/checkboxes/:id')
  async deleteCheckbox(
    @Param('checklistId') checklistId: string,
    @Param('id') id: string,
  ): Promise<Dto<object>> {
    const message = await this.checklistService.deleteCheckbox(checklistId, id)
    return { data: {}} 
  }
}
