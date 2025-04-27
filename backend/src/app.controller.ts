import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1/PFG')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string; status: string } {
    return this.appService.getHello();
  }
}
