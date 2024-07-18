import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CoffeeGetDto } from 'shared-types';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getCoffee/:id')
  @CacheTTL(0)
  async getCoffee(@Param('id') id: string): Promise<CoffeeGetDto> {
    const [coffee, image] = await Promise.all([
      this.appService.getCoffee(id),
      this.appService.getImage(id),
    ]);

    return { ...coffee, image };
  }
}
