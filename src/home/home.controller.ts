import { Controller, Get } from '@nestjs/common'
import { HomeService } from './home.service'
import { ArticleService } from 'src/article/article.service'

@Controller('home')
export class HomeController {
}
