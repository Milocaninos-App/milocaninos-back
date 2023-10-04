import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Donation {
    _id?: string;

    @Prop({ required: true })
    id: string;

    @Prop({ required: true, maxlength: 50 })
    name: string;

    @Prop({ required: true, maxlength: 50 })
    email: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true,  default: Date.now})
    donation_date: Date;

    @Prop({ required: true, maxlength: 50 })
    payment_method: string;

    @Prop({ default: true })
    isActive: boolean;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
