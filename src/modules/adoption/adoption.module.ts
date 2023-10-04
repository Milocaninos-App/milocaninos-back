import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';

import { AdoptionController } from './adoption.controller';
import { AdoptionService } from './adoption.service';
import { Adoption, AdoptionSchema } from './entities/adoption.entity';

@Module({
  controllers: [AdoptionController],
  providers: [AdoptionService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Adoption.name,
        schema: AdoptionSchema
      }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule
  ]
})
export class AdoptionModule { }
