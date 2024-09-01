import { Module } from '@nestjs/common'
import { OnboardingController } from './onboarding.controller'
import { DbModule } from 'src/db/db.module'
import { OnboardingService } from './onboarding.service'

@Module({
  imports: [DbModule],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}
