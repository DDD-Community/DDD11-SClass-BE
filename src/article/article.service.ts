import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import axios from 'axios';
import { object } from 'joi';
import { html } from 'cheerio';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../schemas/article.schema';
import { Model } from 'mongoose';
const cheerio = require('cheerio');

const baseUrl = 'https://yozm.wishket.com'
const requests = [['planner', '/magazine/list/plan/'], ['designer','/magazine/list/design/'], ['developer', '/magazine/list/develop/']]

@Injectable()
export class ArticleService {
  @InjectModel(Article.name) private articleModel: Model<Article>
  
  async create() {
    var inserted = 0 
    for (const request of requests) {
      const metadataList = await fetchUrlsFromPage(baseUrl+request[1])
      for (let i = 0; i < metadataList.urls.length; i++) {
        const url = metadataList.urls[i];
        const title = metadataList.titles[i];
        const thumbnail = metadataList.thumbnails[i];
        
        var article = new this.articleModel({
  url: baseUrl + url,
  thumbnail: baseUrl + thumbnail,
  title: title, 
  source: '요즘 IT',
  job: request[0],
  postDate: Date(),
  category: 'IT',
        })
        const exist = await this.articleModel.findOne({url: baseUrl + url})
        if (!exist) {
          article.save()
          inserted += 1

        }
        // console.log(article);
        
      }
       
    }

    
    return inserted
  }
}

// 함수 정의
async function fetchUrlsFromPage(url: string): Promise<CreateArticleDto.Metadata> {
  var metadata:CreateArticleDto.Metadata = {urls: [], thumbnails: [], titles: []}
  try {
    // 페이지의 HTML을 가져옵니다
    var { data } = await axios.get(url);
    // HTML을 파싱합니다
    const $ = cheerio.load(data);

$('.list-cover').each((index, element) => {
  
  // Extract href attributes from <a> tags
$(element).find('a.item-title.link-text.link-underline.text900').each((index, aElement) => {
    const href = $(aElement).attr('href');
    const title = $(aElement).text()
    if (href) {
      metadata.urls.push(href)
      metadata.titles.push(title)
    }
  })
  

  // Extract src attributes from <img> tags
$(element).find('img.thumbnail-image').each((index, imgElement) => {
    const src = $(imgElement).attr('src');
    if (src) {
      metadata.thumbnails.push(src)
    }
  })

});

    return metadata
  } catch (error) {
    console.error('Error fetching or parsing the page:', error);
    return metadata
  }
}