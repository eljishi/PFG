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
import {UsuariosService} from "./usuarios.service";
import {UsuarioDTO} from "./dto/usuarios.dto/usuarios.dto";


@Controller('api/v1/ejercicios')
export class UsuariosController {

    constructor(
        private readonly usuariosService: UsuariosService) {
    }


    @Post('')
    async create(@Body() usuarioDto: UsuarioDTO) {
        try {
            const resp = await this.usuariosService.create(usuarioDto);
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
    async getUsuarios() {
        try {
            const data =
                await this.usuariosService.getUsuarios();
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
    @Get('usuario/:id')
    async getUsuario(@Param('id') id: string) {
        try {
            const data =
                await this.usuariosService.getUsuario(id);
            if (data) {
                return {
                    status: 'Ok',
                    data
                }
            }
            return new NotFoundException({
                status: 'Error',
                message: 'Usuario no encontrada'
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

    @Put('/:id')
    async updateUsuarios(
        @Param('id') id: string,
        @Body() usuarioDto: UsuarioDTO) {
        try {
            const updatedMovie =
                await this.usuariosService.updateUsuario(
                    id, usuarioDto
                );
            if (!updatedMovie) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Usuario no encontrado'
                })
            }
            return {
                status: 'Ok',
                message: 'Usuario actualizado'
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
    async deleteUsuario(@Param('id') id: string) {
        try {
            const serieDeleted =
                await this.usuariosService.deleteUsuario(id);
            if (!serieDeleted) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Usuario no encontrado'
                })
            }
            return {
                status: 'Ok',
                message: 'Usuario eliminado'
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
