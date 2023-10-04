import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';
import { EXCEPTIONS_MESSAGES } from 'src/exceptions/custom-exception';

@Controller('dog')
export class DogController {
  constructor(
    private readonly dogService: DogService
  ) { }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogService.create(createDogDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.dogService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.dogService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.dogService.update(id, updateDogDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.dogService.remove(id);
  }

  private isValidMongoId(id: string): boolean {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    return mongoIdRegex.test(id);
  }
}
