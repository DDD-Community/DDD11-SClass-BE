import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { TypedBody } from '@nestia/core'
import { CreateOnboardingDto } from './dto/create-onboarding.dto'
import { OnboardingService } from './onboarding.service'

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  /**
   * job 은 'designer' | 'developer' | 'planner' 중 하나
   * @summary 사용자 정보 수집
   * @returns sample return
   * @tag Onboarding 온보딩 & 회원가입
   */
  @Post()
  async create(@TypedBody() req: CreateOnboardingDto.Req) {
    await this.onboardingService.create(req)
  }
}
