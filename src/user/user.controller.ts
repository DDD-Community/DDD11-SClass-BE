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
// import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * job 은 'designer' | 'devloper' | 'project_manager' 중 하나
   * @summary 사용자 정보 수집
   * @returns sample return
   * @tag Onboarding 온보딩 & 회원가입
   */
  @Post()
  create(@TypedBody() req: CreateUserDto.Req) {
    return this.userService.create(req)
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  /**
   * sample description
   * @summary 마이페이지
   * @returns sample return
   * @tag My 마이페이지
   */
  @Get(':id')
  findOne(@Param('id') id: string): ReadUserDto.Res {
    return { nickname: 'abc' }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
