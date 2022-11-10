import {
    Injectable,
    BadRequestException,
    NotFoundException,
    NotAcceptableException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Cart,CartDocument } from 'src/model/cart.schema';
  import { CreateCartDto } from './dto/create-cart.dto';
  import { UpdateCartDto } from './dto/update-cart.dto';
  
  @Injectable()
  export class CartService {
    constructor(
      @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    ) {}
  
    async CartList(): Promise<Cart[]> {
      try {
        console.log('Service called')
        return this.cartModel.find().exec();
      } catch (err) {
        throw new BadRequestException(err);
      }
    }
    async singleCart(id: string): Promise<Cart> {
      try {
        return await this.cartModel.findById(id).exec();
      } catch (err) {
        throw new NotFoundException(err);
      }
    }
  
    async createCart(createCartDto: CreateCartDto): Promise<Cart> {
      try {
        return await this.cartModel.create(createCartDto);
      } catch (err) {
        throw new NotAcceptableException(err);
      }
    }
    async updateCart(
      id: string,
      updateCartDto: UpdateCartDto,
    ): Promise<Cart> {
      try {
        return await this.cartModel
          .findByIdAndUpdate(id, updateCartDto, { new: true })
          .exec();
      } catch (err) {
        throw new NotAcceptableException(err);
      }
    }
  
    async deleteCart(id: string): Promise<Cart> {
      try {
        return await this.cartModel.findByIdAndDelete(id).exec();
      } catch (err) {
        throw new NotAcceptableException(err);
      }
    }
  }
  