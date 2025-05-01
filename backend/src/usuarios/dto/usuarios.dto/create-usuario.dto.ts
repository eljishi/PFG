import { IsBoolean, IsString, IsOptional, IsEmail, IsArray } from 'class-validator';

export class CreateUsuarioDTO {
  @IsString()
  @IsOptional() // Hacer opcional si no todos los usuarios son atletas
  idEntrenador?: string; // Marcar como opcional con '?' si no siempre se envía

  @IsEmail() // Usar IsEmail para validar el formato del correo
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