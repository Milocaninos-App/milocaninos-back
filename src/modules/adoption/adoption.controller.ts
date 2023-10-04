import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { EXCEPTIONS_MESSAGES } from 'src/exceptions/custom-exception';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';

@Controller('adoption')
export class AdoptionController {
  constructor(
    private readonly adoptionService: AdoptionService
  ) { }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAdoptionDto: CreateAdoptionDto) {
    return this.adoptionService.create(createAdoptionDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.adoptionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.adoptionService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateAdoptionDto: UpdateAdoptionDto) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.adoptionService.update(id, updateAdoptionDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.adoptionService.remove(id);
  }

  private isValidMongoId(id: string): boolean {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    return mongoIdRegex.test(id);
  }
}
