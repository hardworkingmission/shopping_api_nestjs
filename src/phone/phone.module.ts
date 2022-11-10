import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { Phone, PhoneSchema } from 'src/model/phone.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [PhoneService],
  imports: [
    MongooseModule.forFeature([{ name: Phone.name, schema: PhoneSchema }]),
  ],
  controllers: [PhoneController]
})
export class PhoneModule {}
