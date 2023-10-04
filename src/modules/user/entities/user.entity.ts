import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Adoption } from "src/modules/adoption/entities/adoption.entity";

@Schema()
export class User {

    _id?: string;

    @Prop({ required: true, maxlength: 50})
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 6})
    password?: string;

    @Prop({ required: true, maxlength: 255})
    address: string;

    @Prop({ required: true, maxlength: 10, minlength: 7})
    telephone: string;

    @Prop({ required: true, maxlength: 50})
    occupation: string;

    @Prop({ required: true})
    img: string;

    @Prop({ required: true, default: Date.now})
    creation_date: Date;

    @Prop({ required: true})
    birth_date: Date;

    @Prop({ required: false, default: () => []})
    adoptionList: Adoption[]

    @Prop({ required: true, type: [String], default: ['user']})
    roles: string[]

    @Prop({ default: true })
    isActive: boolean

}

export const UserSchema = SchemaFactory.createForClass(User);