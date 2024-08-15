import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ReadUserDto } from './dto/read-user.dto'
import { TypedBody } from '@nestia/core'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * job 은 'designer' | 'developer' | 'project_manager' 중 하나
   * @summary 사용자 정보 수집
   * @returns sample return
   * @tag Onboarding 온보딩 & 회원가입
   */
  @Post()
  async create(@TypedBody() req: CreateUserDto.Req) {
    await this.userService.create(req)
  }

  /**
   * sample description
   * @summary 마이페이지
   * @returns sample return
   * @tag My 마이페이지
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadUserDto.Res> {
    return await this.userService.findOne(id)
  }
}
