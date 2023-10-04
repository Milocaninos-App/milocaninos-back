import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';
import { EXCEPTIONS_MESSAGES } from 'src/exceptions/custom-exception';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) {
      throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    }

    return this.userService.remove(id);
  }

  private isValidMongoId(id: string): boolean {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    return mongoIdRegex.test(id);
  }
}
