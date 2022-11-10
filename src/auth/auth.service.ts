import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.singleUser(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user._doc;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      name: user.username,
      sub: user.email,
      role:user.role
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
