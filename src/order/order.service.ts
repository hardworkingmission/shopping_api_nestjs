import {
  Injectable,
  BadRequestException,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/model/order.schema';
import { CreateOrderDto } from './dto/update-order.dto';
import { UpdateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async orderList(): Promise<Order[]> {
    try {
      console.log('Service called');
      return this.orderModel.find().exec();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async singleOrder(id: string): Promise<Order> {
    try {
      return await this.orderModel.findById(id).exec();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.orderModel.create(createOrderDto);
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }
  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    try {
      return await this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
        new: true,
      }).exec();
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }

  async deleteOrder(id: string): Promise<Order> {
    try {
      return await this.orderModel.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new NotAcceptableException(err);
    }
  }
}
