import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateFavoriteDto {
  @IsNotEmpty({ message: 'isFavorite không được để trống' })
  @IsBoolean({ message: 'isFavorite phải là boolean' })
  isFavorite: boolean;
}
