import { Module } from '@nestjs/common'
import { OnboardingController } from './onboarding.controller'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'

@Module({
  imports: [UserModule],
  controllers: [OnboardingController],
})
export class OnboardingModule {}
