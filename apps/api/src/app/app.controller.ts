import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { getRandomString } from './utils/randomString';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  async addData() {
    return this.appService.addData({
      email: await getRandomString(50),
      name: 'asd',
      title: 'ttt',
      sex: 'M'
    });
  }
}
