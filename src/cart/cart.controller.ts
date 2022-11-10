import { Controller,Get,Post,Patch,Param,Body,Delete,UseGuards } from '@nestjs/common';
import { CartService } from './Cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/model/role.enum';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService){}
    @Get()
    async allCart(){
        console.log('called')
        return await this.cartService.CartList()
    }

    @Get(':id')
    async singleCart(@Param('id') id:string){
        return await this.cartService.singleCart(id)
    }
    
    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createCartDto:CreateCartDto){
        return await this.cartService.createCart(createCartDto)
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id:string, @Body() updateCartDto:UpdateCartDto){
        return await this.cartService.updateCart(id,updateCartDto)
    }
    
    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id:string){
        return await this.cartService.deleteCart(id)
    }

}
