import { IsNotEmpty, IsString } from "class-validator";
import { EXCEPTIONS_MESSAGES } from "src/exceptions/custom-exception";
import { Dog } from "src/modules/dog/entities/dog.entity";
import { User } from "src/modules/user/entities/user.entity";

export class CreateAdoptionDto {
    _id?: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('name') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('name') })
    name: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('user') })
    user: User;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('dog') })
    dog: Dog;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('creation_date') })
    creation_date: string;
}
