import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from './entities/dog.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [DogController],
  providers: [DogService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Dog.name,
        schema: DogSchema
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
export class DogModule {}
