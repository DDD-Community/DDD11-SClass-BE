import { Module } from '@nestjs/common'
import { OnboardingController } from './onboarding.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [OnboardingController],
})
export class OnboardingModule {}
