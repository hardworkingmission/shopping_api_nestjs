import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConstant } from './constants/db.constants';
import { PhoneModule } from './phone/phone.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      `mongodb+srv://${dbConstant.username}:${dbConstant.password}@cluster0.34saife.mongodb.net/mobile_shop?retryWrites=true&w=majority`,
    ),
    PhoneModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
