import { Injectable } from '@nestjs/common';
import { CoffeeDataDto, ImageDataDto } from 'shared-types';
@Injectable()
export class AppService {
  getCoffee(id: string): Promise<CoffeeDataDto> {
    return fetch(
      `https://random-data-api.com/api/coffee/random_coffee?id=${id}`,
    ).then((r) => r.json());
  }
  getImage(id: string): Promise<ImageDataDto> {
    return fetch(
      `https://loremflickr.com/json/500/500/coffee,bean?id=${id}`,
    ).then((r) => r.json());
  }
}
