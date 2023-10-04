import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/modules/user/entities/user.entity";

@Schema()
export class Dog {
    _id?: string;

    @Prop({ required: true, maxlength: 50 })
    name: string;

    @Prop({ required: true, maxlength: 50 })
    breed: string;

    @Prop({ required: true })
    birth_date: Date;

    @Prop({ required: true, maxlength: 10 })
    genre: string;

    @Prop({ required: true, maxlength: 10 })
    size: string;

    @Prop({ required: true, maxlength: 20 })
    color: string;

    @Prop({ required: true, maxlength: 255 })
    description: string;

    @Prop({ required: true, maxlength: 50 })
    health_status: string;

    @Prop({ required: true })
    img: string;

    @Prop({ required: false})
    owner: User;

    @Prop({ default: true })
    isActive: boolean;
}

export const DogSchema = SchemaFactory.createForClass(Dog);
