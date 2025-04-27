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
import {EjerciciosService} from "./ejercicios.service";
import {EjercicioDTO} from "./dto/ejercicios.dto/ejercicios.dto";

@Controller('api/v1/ejercicios')
export class EjerciciosController {

    constructor(
        private readonly ejerciciosService: EjerciciosService) {
    }

    // inserta un ejercicio
    @Post('')
    async create(@Body() ejercicioDto: EjercicioDTO) {
        try {
            const resp = await this.ejerciciosService.create(ejercicioDto);
            return {
                status: 'Ok',
                message: 'Ejercicio creado'
            }
        } catch (e: any) {
            throw new BadRequestException(
                {
                    status: 'Error',
                    message: e.message
                })
        }

    }

    // pilla todos los ercicios
    @Get('')
    async getEjercicios() {
        try {
            const data =
                await this.ejerciciosService.getEjercicios();
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

    //pilla una serie
    @Get('ejercicio/:id')
    async getEjercicio(@Param('id') id: string) {
        try {
            const data =
                await this.ejerciciosService.getEjercicio(id);
            if (data) {
                return {
                    status: 'Ok',
                    data
                }
            }
            return new NotFoundException({
                status: 'Error',
                message: 'Ejercicio no encontrada'
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
    async updateEjercicio(
        @Param('id') id: string,
        @Body() ejercicioDto: EjercicioDTO) {
        try {
            const updatedMovie =
                await this.ejerciciosService.updateEjercicio(
                    id, ejercicioDto
                );
            if (!updatedMovie) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Ejercicio no encontrado'
                })
            }
            return {
                status: 'Ok',
                message: 'Ejercicio actualizado'
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
    async deleteEjercicio(@Param('id') id: string) {
        try {
            const serieDeleted =
                await this.ejerciciosService.deleteEjercicio(id);
            if (!serieDeleted) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Ejercicio no encontrado'
                })
            }
            return {
                status: 'Ok',
                message: 'Ejercicio eliminado'
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
