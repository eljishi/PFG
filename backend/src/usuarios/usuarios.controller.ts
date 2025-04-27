import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Post, Put, Req, UnauthorizedException
} from '@nestjs/common';
import {UsuariosService} from "./usuarios.service";
import {UsuarioDTO} from "./dto/usuarios.dto/usuarios.dto";
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
    async register(@Body() usuarioDto: UsuarioDTO) {
        try {
            const hashedPassword =
                await bcrypt.hash(usuarioDto.password, 20)
            const user = await this.usuariosService.create({
                id: usuarioDto.id,
                mail: usuarioDto.mail,
                user: usuarioDto.user,
                password: hashedPassword,
                esEntrenador: usuarioDto.esEntrenador

            });

            const jwt = await this.jwtService.signAsync({
                id: user.id,
                user: user.user,
                mail: user.mail,
                esEntrenador: user.esEntrenador
            });
            return {
                ok: true,
                token: jwt
            }
        }catch (e:any){
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            })
        }
    }
    @Post('login')
    async login(
        @Body('email')email: string,
        @Body('password')password: string
    ){
        try{
            const user = await this.usuariosService.findOne(
                {email}
            )
            if(!user){
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Usuario o Contraseña incorrectas'
                })

            }
            if (!(await bcrypt.compare(password, user.password))){
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Usuario o Contraseña incorrectas'
                })
            }
            const jwt = await this.jwtService.signAsync({
                id: user.id,
                user: user.user,
                mail: user.mail,
                esEntrenador: user.esEntrenador
            })
            return{
                ok: true,
                token: jwt
            }
        }catch (e: any){
            if(e instanceof UnauthorizedException){
                throw e;
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            })
        }
    }

    @Get('user-info')
    async userInfo(@Req() request: Request){
        try{
            const data =
                await this.jwtService.verifyAsync(
                    <string>request.get('x-token'));
            if (!data){
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Token incorrecto'
                })
            }
            const user =
                await this.usuariosService.findOne(
                    {mail: data.mail});

            return {
                ok: true,
                usuario: (({id, user, mail, esEntrenador}) => ({
                    id, user, mail, esEntrenador
                }))(user)
            }
        }catch (e) {
            if (e instanceof UnauthorizedException){
                throw e;
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            })
        }
    }

}
