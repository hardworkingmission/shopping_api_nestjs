import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  street: string;

  @Prop({ default: '' })
  apartment: string;

  @Prop({ default: '' })
  city: string;

  @Prop({ default: '' })
  zip: string;

  @Prop({ default: '' })
  country: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ default: 'user' })
  role: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
