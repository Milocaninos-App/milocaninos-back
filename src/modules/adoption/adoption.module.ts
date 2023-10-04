import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';

@Module({
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
