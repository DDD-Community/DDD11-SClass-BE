import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ReadHomeDto } from './home/dto/read-home.dto'

@Controller()
export class AppController {}
