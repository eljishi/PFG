import { Module } from '@nestjs/common';
import { EntrenamientosController } from './entrenamientos.controller';
import { EntrenamientosService } from './entrenamientos.service';
import {MongooseModule} from "@nestjs/mongoose";
import {EntrenamientosSchema} from "./schemas/entrenamientos.schema/entrenamientos.schema";

@Module({
  imports: [
    MongooseModule.forFeature(
        [
          {
            name: 'Entrenamiento',
            schema: EntrenamientosSchema,
            collection: 'entrenamientos'
          }
        ]
    )
  ],
  controllers: [EntrenamientosController],
  providers: [EntrenamientosService]
})
export class EntrenamientosModule {}
