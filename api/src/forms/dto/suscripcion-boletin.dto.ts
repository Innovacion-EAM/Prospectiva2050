import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SuscripcionBoletinDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nombre?: string;
}