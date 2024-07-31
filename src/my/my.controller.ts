import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { TypedRoute } from '@nestia/core'
import { MyService } from './my.service'
import { CreateMyDto } from './dto/create-my.dto'
import { UpdateMyDto } from './dto/update-my.dto'

@Controller('my')
export class MyController {
  constructor(private readonly myService: MyService) {}

  /**
   * sample description
   * @returns sample return
   * @tag MY 유저정보
   * @summary 온보딩
   */
  @TypedRoute.Post()
  create(@Body() createMyDto: CreateMyDto) {
    return this.myService.create(createMyDto)
  }

  /**
   * sample description
   * @tag MY 유저정보
   * @summary 마이페이지 조회
   */
  @TypedRoute.Get()
  findAll() {
    return this.myService.findAll()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.myService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMyDto: UpdateMyDto) {
  //   return this.myService.update(+id, updateMyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.myService.remove(+id);
  // }
}
