import { Module } from '@nestjs/common';
import { EjerciciosController } from './ejercicios.controller';
import { EjerciciosService } from './ejercicios.service';
import {MongooseModule} from "@nestjs/mongoose";
import {EjerciciosSchema} from "./schemas/ejercicios.schema/ejercicios.schema";

@Module({
  imports: [
    MongooseModule.forFeature(
        [
          {
            name: 'Ejercicio',
            schema: EjerciciosSchema,
            collection: 'ejercicios'
          }
        ]
    )
  ],
  controllers: [EjerciciosController],
  providers: [EjerciciosService]
})
export class EjerciciosModule {}
