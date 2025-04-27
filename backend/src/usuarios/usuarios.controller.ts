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
import {UsuarioDTO} from "./dto/usuarios.dto/usuarios.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";



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
            if (!user){
                throw new BadRequestException()
            }
            return{
                ok: true,
                token: user
            }
        }catch (e:any){
            if (e instanceof BadRequestException){
                throw new BadRequestException({
                    ok: false,
                    message: e.message
                })
            }
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
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
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
                    request.get('x-token'));
            if (!data){
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Token incorrecto'
                })
            }
            const user =
                await this.usuariosService.findOne(
                    {email: data.email});

            return {
                ok: true,
                usuario: (({_id, username, email, avatar}) => ({
                    _id, username, email, avatar
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
