import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EXCEPTIONS_MESSAGES } from 'src/exceptions/custom-exception';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donation')
export class DonationController {
  constructor(
    private readonly donationService: DonationService
  ) { }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationService.create(createDonationDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.donationService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.donationService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.donationService.remove(id);
  }

  private isValidMongoId(id: string): boolean {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    return mongoIdRegex.test(id);
  }
}
