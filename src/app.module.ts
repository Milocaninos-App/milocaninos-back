import { Module } from '@nestjs/common';
import { AdoptionModule } from './modules/adoption/adoption.module';
import { AuthModule } from './modules/auth/auth.module';
import { DogModule } from './modules/dog/dog.module';
import { DonationModule } from './modules/donation/donation.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UserModule,
    DogModule,
    AdoptionModule,
    DonationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
