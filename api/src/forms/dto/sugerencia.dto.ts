import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SugerenciaDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nombre: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  sugerencia: string;
}