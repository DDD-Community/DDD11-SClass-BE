import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypedBody } from '@nestia/core';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly userService: UserService) {}

    /**
   * job 은 'designer' | 'developer' | 'planner' 중 하나
   * @summary 사용자 정보 수집
   * @returns sample return
   * @tag Onboarding 온보딩 & 회원가입
   */
    @Post()
    async create(@TypedBody() req: CreateUserDto.Req) {
      await this.userService.create(req)
    }
}
