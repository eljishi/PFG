import { IsBoolean, IsString, IsOptional, IsEmail, IsArray } from 'class-validator';

export class CreateUsuarioDTO {
  @IsString()
  @IsOptional() 
  idEntrenador?: string;

  @IsEmail() 
  mail: string;

  @IsString()
  user: string;

  @IsString()
  password: string;

  @IsBoolean()
  esEntrenador: boolean;
  
  @IsArray()
  @IsOptional()
  atletas?: Array<{id: string, nombre: string}>;
}