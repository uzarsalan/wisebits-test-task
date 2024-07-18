import { Injectable } from '@nestjs/common';
import { CoffeeDataDto, ImageDataDto } from 'shared-types';
@Injectable()
export class AppService {
  getCoffee(id: string): Promise<CoffeeDataDto> {
    return fetch(
      `https://random-data-api.com/api/coffee/random_coffee?id=${id}`,
    ).then(this.returnResponseJsonOrThrow);
  }
  getImage(id: string): Promise<ImageDataDto> {
    return fetch(
      `https://loremflickr.com/json/500/500/coffee,bean?id=${id}`,
    ).then(this.returnResponseJsonOrThrow);
  }
  private async returnResponseJsonOrThrow(r: Response) {
    if (!r.ok) {
      const resText = await r.text();
      console.log(resText);
      throw new Error(`HTTP error! status: ${r.status}`);
    }
    return r.json();
  }
}
