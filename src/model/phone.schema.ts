import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhoneDocument = Phone & Document;

@Schema({ timestamps: true })
export class  Phone {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  network: string;

  @Prop({ default: '' })
  launch: string;

  @Prop({ default: '' })
  body: Array<string>;

  @Prop({ default: '' })
  display: string;

  @Prop({ default: '' })
  memory: string;

  @Prop({ default: '' })
  camera: string;

  @Prop({ required: true })
  price: number;

  @Prop({default:''})
  color:Array<string>
  
  @Prop({default:false})
  inStock:boolean

  @Prop({ default: '' })
  battery: string;

  @Prop()
  createdAt?:Date
  
  @Prop()
  updatedAt?:Date
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
