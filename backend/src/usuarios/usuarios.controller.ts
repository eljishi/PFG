import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Req, UnauthorizedException
} from '@nestjs/common';
import {UsuariosService} from "./usuarios.service";
// Cambia esta importación
// import {UsuarioDTO} from "./dto/usuarios.dto/usuarios.dto";
// Por esta:
import { CreateUsuarioDTO } from './dto/usuarios.dto/create-usuario.dto'; // Asegúrate que la ruta sea correcta
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";

@Controller('api/v1/users')
export class UsuariosController {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService) {
    }

    @Post('register')
    async register(@Body() createUsuarioDto: CreateUsuarioDTO) {
        const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
        try {
            const user = await this.usuariosService.create({
                idEntrenador: createUsuarioDto.idEntrenador,
                mail: createUsuarioDto.mail,
                user: createUsuarioDto.user,
                password: hashedPassword,
                esEntrenador: createUsuarioDto.esEntrenador
            });
    
            // Si es un atleta (no es entrenador) y tiene un idEntrenador, vincularlo al entrenador
            if (!createUsuarioDto.esEntrenador && createUsuarioDto.idEntrenador) {
                await this.usuariosService.addAtletaToEntrenador(
                    createUsuarioDto.idEntrenador,
                    user._id.toString(),
                    user.user
                );
            }
    
            const jwt = await this.jwtService.signAsync({
                _id: user._id,
                idEntrenador: user.idEntrenador,
                user: user.user,
                mail: user.mail,
                esEntrenador: user.esEntrenador
            });
            return {
                ok: true,
                token: jwt
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            });
        }
    }

    @Post('login')
    async login(
        @Body('mail') mail: string,
        @Body('password') password: string
    ) {
        try {
            const user = await this.usuariosService.findOne({ mail });
            if (!user) {
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Usuario o Contraseña incorrectas'
                });
            }
            if (!(await bcrypt.compare(password, user.password))) {
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Usuario o Contraseña incorrectas'
                });
            }
            const jwt = await this.jwtService.signAsync({
                _id: user._id,
                idEntrenador: user.idEntrenador,
                user: user.user,
                mail: user.mail,
                esEntrenador: user.esEntrenador
            });
            return {
                ok: true,
                token: jwt
            };
        } catch (e: any) {
            if (e instanceof UnauthorizedException) {
                throw e;
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            });
        }
    }

    @Get('user-info')
    async userInfo(@Req() request: Request) {
        try {
            const data = await this.jwtService.verifyAsync(<string>request.get('x-token'));
            if (!data) {
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Token incorrecto'
                });
            }
            const user = await this.usuariosService.findOne({ mail: data.mail });

            return {
                ok: true,
                usuario: (({ _id, idEntrenador , user, mail, esEntrenador }) => ({
                    _id, idEntrenador , user, mail, esEntrenador
                }))(user)
            };
        } catch (e) {
            if (e instanceof UnauthorizedException) {
                throw e;
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            });
        }
    }

    // Endpoint para vincular un atleta a un entrenador
    @Post('vincular-atleta')
    async vincularAtleta(
        @Body('entrenadorId') entrenadorId: string,
        @Body('atletaId') atletaId: string,
        @Body('atletaNombre') atletaNombre: string
    ) {
        try {
            const entrenador = await this.usuariosService.addAtletaToEntrenador(entrenadorId, atletaId, atletaNombre);
            
            return {
                ok: true,
                message: 'Atleta vinculado correctamente',
                entrenador: {
                    _id: entrenador._id,
                    user: entrenador.user,
                    atletas: entrenador.atletas
                }
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            });
        }
    }

    // Endpoint para obtener los atletas de un entrenador
    @Get('atletas/:entrenadorId')
    async getAtletasByEntrenador(@Param('entrenadorId') entrenadorId: string) {
        try {
            const atletas = await this.usuariosService.getAtletasByEntrenador(entrenadorId);
            
            return {
                ok: true,
                atletas
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            });
        }
    }
}