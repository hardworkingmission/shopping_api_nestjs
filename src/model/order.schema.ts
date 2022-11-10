import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop()
  products: [
    {
      productId: {type:string};

      quantity: { type: number; default: 1 };
    },
  ];

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  address: object;

  @Prop({ default: 'pending' })
  status: string;
  
  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
