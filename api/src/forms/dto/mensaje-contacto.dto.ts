import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class MensajeContactoDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nombre: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  asunto?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  mensaje: string;
}