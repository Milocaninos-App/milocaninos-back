import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { Donation, DonationSchema } from './entities/donation.entity';

@Module({
  controllers: [DonationController],
  providers: [DonationService],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: Donation.name,
        schema: DonationSchema
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
export class DonationModule { }
