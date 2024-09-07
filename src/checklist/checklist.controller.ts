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

@ApiTags('Checklist')
@Controller('checklists')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Get()
  async findByUser(@Query('userId') userId: string) {
    return await this.checklistService.findByUser(userId)
  }

  @Post()
  async createChecklist(@Body() createChecklistDto: CreateChecklistDto) {
    return await this.checklistService.createChecklist(createChecklistDto)
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
  ): Promise<object> {
    const res = await this.checklistService.updateChecklistTitle(
      checklistId,
      req.title,
    )
    return {}
  }

  /**
   * sample description
   * @summary 체크리스트 프로젝트 삭제
   * @returns sample return
   */
  @Delete(':checklistId')
  async deleteChecklist(
    @Param('checklistId') checklistId: string,
  ): Promise<object> {
    const message = await this.checklistService.deleteChecklist(checklistId)
    return { message: message }
  }

  @Get(':checklistId/checkboxes')
  async getCheckboxes(@Param('checklistId') checklistId: string) {
    return await this.checklistService.getCheckboxesByChecklistId(checklistId)
  }

  @Post(':checklistId/checkboxes')
  async createCheckbox(
    @Param('checklistId') checklistId: string,
    @Body() createCheckboxDto: CreateCheckboxDto,
  ) {
    return await this.checklistService.createCheckbox({
      ...createCheckboxDto,
      checklistId,
    })
  }

  @Patch(':checklistId/checkboxes/:id/completed')
  async updateCompleted(
    @Param('checklistId') checklistId: string,
    @Param('id') id: string,
    @Body() update: UpdateCompletedDto,
  ) {
    return await this.checklistService.updateCompleted(checklistId, id, update)
  }

  @Patch(':checklistId/checkboxes/:id/order')
  async updateOrderNo(
    @Param('checklistId') checklistId: string,
    @Param('id') id: string,
    @Body() update: UpdateOrderNoDto,
  ) {
    return await this.checklistService.updateOrderNo(checklistId, id, update)
  }

  @Patch(':checklistId/checkboxes/:id/main')
  async updateIsMain(
    @Param('checklistId') checklistId: string,
    @Param('id') id: string,
    @Body() update: UpdateIsMainDto,
  ) {
    return await this.checklistService.updateIsMain(checklistId, id, update)
  }

  @Delete(':checklistId/checkboxes/:id')
  async deleteCheckbox(
    @Param('checklistId') checklistId: string,
    @Param('id') id: string,
  ): Promise<object> {
    const message = await this.checklistService.deleteCheckbox(checklistId, id)
    return { message: message }
  }
}
