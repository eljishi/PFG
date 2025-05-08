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

}
