import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class InscripcionTallerDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  taller: string;

  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nombre: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  telefono?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  adicional?: string;
}