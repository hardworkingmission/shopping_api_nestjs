import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ required: true })
  userId: string;

  @Prop()
  products: [
    {
      productId: {type:string};

      quantity: { type: number; default: 1 };
    },
  ];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
