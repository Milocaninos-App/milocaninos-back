import { IsNotEmpty, IsEmail, IsNumber, IsDateString, IsString } from "class-validator";
import { EXCEPTIONS_MESSAGES } from "src/exceptions/custom-exception";

export class CreateDonationDto {

    _id?: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('name') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('name') })
    name: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('email') })
    @IsEmail({}, { message: EXCEPTIONS_MESSAGES.INVALID_EMAIL('email') })
    email: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('quantity') })
    @IsNumber({}, { message: EXCEPTIONS_MESSAGES.INVALID_NUMBER('quantity') })
    quantity: number;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('donation_date') })
    donation_date: Date;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('payment_method') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('payment_method') })
    payment_method: string;
}
