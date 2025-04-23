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
import {EntrenamientosService} from "./entrenamientos.service";
import {EntrenamientosDTO} from "./dto/entrenamientos.dto/entrenamientos.dto";
import {Query} from "mongoose";

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
                await this.entrenamientosService.getEjercicios();
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


    @Get('ejercicio/:id')
    async getEntrenamiento(@Param('id') id: string) {
        try {
            const data =
                await this.entrenamientosService.getEjercicio(id);
            if (data) {
                return {
                    status: 'Ok',
                    data
                }
            }
            return new NotFoundException({
                status: 'Error',
                message: 'Entrenamiento no encontrada'
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

    /*
    @Get('search')
    async getSerieByTitleOrSynopsis(@Query('query') query: string) {
        try {
            const series = await this.ejerciciosService.getSerieByTitleOrSynopsis(query);
            return {
                status: 'Ok',
                data: series
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: "Error",
                message: e.message
            });
        }
    }
    */

    //actualiza una serie SI
    @Put('/:id')
    async updateEntrenamiento(
        @Param('id') id: string,
        @Body() entrenamientosDTO: EntrenamientosDTO) {
        try {
            const updatedMovie =
                await this.entrenamientosService.updateEjercicio(
                    id, entrenamientosDTO
                );
            if (!updatedMovie) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Entrenamienti no encontrado'
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

    //Elimina una Serie SI
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

    /*
    @Get('categorias')
    async getCategories() {
        try {
            const data =
                await this.seriesService.getCategories();

            return {
                status: 'Ok',
                data
            }
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            })
        }
    }

    @Get('categoria/:categoria')
    async getSeriesByCategory(@Param('categoria') categoria: string) {
        try {
            const data = await this.seriesService.getSeriesByCategory(categoria);
            if (data.length > 0) {
                return {
                    status: 'Ok',
                    data
                };
            }
            throw new NotFoundException({
                status: 'Error',
                message: 'No se encontraron series para esta categoría'
            });
        } catch (e: any) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message
            });
        }
    }
    */
}
