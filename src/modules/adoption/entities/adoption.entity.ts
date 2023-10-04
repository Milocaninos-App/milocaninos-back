import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/modules/user/entities/user.entity";
import { Dog } from "src/modules/dog/entities/dog.entity";

@Schema()
export class Adoption {
    _id?: string;

    @Prop({ required: true, maxlength: 50 })
    name: string;

    @Prop({ required: true, type: User })
    user: User;

    @Prop({ required: true })
    dog: Dog;

    @Prop({ required: true, default: Date.now})
    creation_date: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const AdoptionSchema = SchemaFactory.createForClass(Adoption);
