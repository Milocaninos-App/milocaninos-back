import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction } from "express";
import { JwtPayload } from "src/interfaces/jwt-payload";
import { AuthService } from "src/modules/auth/auth.service";


@Injectable()
export class AdminMiddleware implements NestMiddleware{

    constructor(
        private jwtService: JwtService,
        private authService: AuthService
    ) { }

    async use(req: any, res: any, next: NextFunction ) {
        const authorizationToken = req.headers['authorization']
        if(  authorizationToken ){

            const token = authorizationToken.split(' ')['1']

            const payload = await this.jwtService.verifyAsync<JwtPayload>(
                token, { secret: process.env.JWT_SECRET_KEY }
              )

            const user = await this.authService.findUserById(payload.id);
            console.log( user.roles )
            if( user.roles.includes("admin") ) { 
                
                next() 
            }else { 
                throw new UnauthorizedException("You don't have authorization to make this action") 
            }

        } else{
            throw new UnauthorizedException('There is no baearer token');
        }
    }
}