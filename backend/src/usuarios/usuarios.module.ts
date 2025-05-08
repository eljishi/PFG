import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsuariosSchema} from "./schemas/usuarios.schema/usuarios.schema";


@Module({
  imports: [
    MongooseModule.forFeature(
        [
          {
            name: 'Usuario',
            schema: UsuariosSchema,
            collection: 'usuarios'
          }
        ]
    ),
      JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
          inject: [ConfigService],
      }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
