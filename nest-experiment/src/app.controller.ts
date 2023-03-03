import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('set')
  setA(@Query('a') a: string) {
    return this.appService.setA(a);
  }

  @Get('get')
  getA() {
    return this.appService.a;
  }
}
