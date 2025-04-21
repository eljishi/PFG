import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { EjerciciosModule } from './ejercicios/ejercicios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
        "mongodb+srv://dama:dama@cluster.5b2x3.mongodb.net/PFG?retryWrites=true&w=majority&appName=Cluster"
    ),
    EjerciciosModule,
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
