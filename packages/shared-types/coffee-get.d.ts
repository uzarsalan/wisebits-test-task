import { CoffeeDataDto } from "./coffee-data";
import { ImageDataDto } from "./image-data";

export interface CoffeeGetDto extends CoffeeDataDto {
  image: ImageDataDto;
}
