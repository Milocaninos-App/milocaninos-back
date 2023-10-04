import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { EXCEPTIONS_MESSAGES } from "src/exceptions/custom-exception";

export class CreateDogDto {
    _id?: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('name') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('name') })
    name: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('breed') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('breed') })
    @MaxLength(50, {message: EXCEPTIONS_MESSAGES.MAX_LENGTH_MESSAGE('breed', 50) })
    breed: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('birth_date') })
    birth_date: Date;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('genre') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('genre') })
    genre: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('size') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('size') })
    size: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('color') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('color') })
    color: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('description') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('description') })
    @MaxLength(255, {message: EXCEPTIONS_MESSAGES.MAX_LENGTH_MESSAGE('description', 255) })
    description: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('health_status') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('health_status') })
    @MaxLength(50, {message: EXCEPTIONS_MESSAGES.MAX_LENGTH_MESSAGE('description', 50) })
    health_status: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('img') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('img') })
    img: string;
}
