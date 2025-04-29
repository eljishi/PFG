import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { EjerciciosModule } from './ejercicios/ejercicios.module';
import * as process from "node:process";
import {UsuariosModule} from "./usuarios/usuarios.module";
import {EntrenamientosModule} from "./entrenamientos/entrenamientos.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
        process.env.DBURL as string
    ),
    EjerciciosModule,
      UsuariosModule,
     // EntrenamientosModule
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
