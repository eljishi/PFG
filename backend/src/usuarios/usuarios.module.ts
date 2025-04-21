import { Module } from '@nestjs/common';
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
            collection: 'Usuario'
          }
        ]
    )
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
