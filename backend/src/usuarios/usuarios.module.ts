import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsuariosSchema} from "./schemas/usuarios.schema/usuarios.schema";
import {JwtModule} from "@nestjs/jwt";
import * as process from "node:process";

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
      JwtModule.register({
          secret: process.env.SECRET,
          signOptions: {expiresIn: '1h'}
      })
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
