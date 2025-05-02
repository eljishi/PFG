import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put
} from '@nestjs/common';
import { EntrenamientosService } from "./entrenamientos.service";
import { EntrenamientosDTO } from "./dto/entrenamientos.dto/entrenamientos.dto";
import { Query } from "mongoose";

@Controller('api/v1/entrenamientos')
export class EntrenamientosController {

    constructor(
        private readonly entrenamientosService: EntrenamientosService) {
    }

    @Post('')
    async create(@Body() entrenamientosDTO: EntrenamientosDTO) {
        try {
            const resp = await this.entrenamientosService.create(entrenamientosDTO);
            return {
                status: 'Ok',
                message: 'Entrenamiento creado'
            }
        } catch (e: any) {
            throw new BadRequestException(
                {
                    status: 'Error',
                    message: e.message
                })
        }
    }

    @Get('')
    async getEntrenamientos() {
        try {
            const data =
                await this.entrenamientosService.getEntrenamientos();
            return {
                status: 'Ok',
                data
            }
        } catch (e: any) {
            return new BadRequestException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('atleta/:idAtleta')
    async getEntrenamientosByAtleta(@Param('idAtleta') idAtleta: string) {
        try {
            const data = await this.entrenamientosService.getEntrenamientosByAtleta(idAtleta);
            if (data && data.length > 0) {
                return {
                    status: 'Ok',
                    data
                }
            }
            return new NotFoundException({
                status: 'Error',
                message: 'No se encontraron entrenamientos para este atleta'
            })
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get(':id')
    async getEntrenamiento(@Param('id') id: string) {
        try {
            const data =
                await this.entrenamientosService.getEntrenamiento(id);
            if (data) {
                return {
                    status: 'Ok',
                    data
                }
            }
            return new NotFoundException({
                status: 'Error',
                message: 'Entrenamiento no encontrado'
            })
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Put(':id')
    async updateEntrenamiento(
        @Param('id') id: string,
        @Body() entrenamientosDTO: EntrenamientosDTO) {
        try {
            const updatedEntrenamiento =
                await this.entrenamientosService.updateEntrenamiento(
                    id, entrenamientosDTO
                );
            if (!updatedEntrenamiento) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Entrenamiento no encontrado'
                })
            }
            return {
                status: 'Ok',
                message: 'Entrenamiento actualizado'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Delete(':id')
    async deleteEntrenamiento(@Param('id') id: string) {
        try {
            const entrenamientoDeleted =
                await this.entrenamientosService.deleteEntrenamiento(id);
            if (!entrenamientoDeleted) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Entrenamiento no encontrado'
                })
            }
            return {
                status: 'Ok',
                message: 'Entrenamiento eliminado'
            }
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
    
    @Get('fecha/:fecha')
    async getEntrenamientosByFecha(@Param('fecha') fecha: string) {
        try {
            const data = await this.entrenamientosService.getEntrenamientosByFecha(fecha);
            if (data && data.length > 0) {
                return {
                    status: 'Ok',
                    data
                }
            }
            return new NotFoundException({
                status: 'Error',
                message: 'No se encontraron entrenamientos para esta fecha'
            })
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }
}
