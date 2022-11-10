import { Controller,Get,Post,Patch,Param,Body,Delete,UseGuards } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { CreatePhoneDto } from './dto/create-user.dto';
import { UpdatePhoneDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/model/role.enum';

@Controller('phone')
export class PhoneController {
    constructor(private readonly phoneService:PhoneService){}
    @Get()
    async allPhone(){
        console.log('called')
        return await this.phoneService.phoneList()
    }

    @Get(':name')
    async singlePhone(@Param('name') name:string){
        return await this.phoneService.singlePhone(name)
    }
    
    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createPhoneDto:CreatePhoneDto){
        return await this.phoneService.createPhone(createPhoneDto)
    }

    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id:string,@Body() updatePhoneDto:UpdatePhoneDto){
        return await this.phoneService.updatePhone(id,updatePhoneDto)
    }
    
    @HasRoles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id:string){
        return await this.phoneService.deletePhone(id)
    }

}
