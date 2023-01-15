import { ForbiddenException, Injectable } from '@nestjs/common';
import { HashService } from 'src/users/hash/hash.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({ email });
    if (
      user &&
      (await this.hashService.comparePassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  generateJwtToken(data: { id: string; email: string }) {
    const payload = { sub: data.id, email: data.email };
    return this.jwtService.sign(payload);
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      id: user.id,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findByCond({
      email: createUserDto.email,
    });

    if (candidate) {
      throw new ForbiddenException('Такой email уже существует!');
    }
    const { password, ...user } = await this.usersService.create(createUserDto);
    const { id, email } = user;

    return {
      ...user,
      access_token: this.generateJwtToken({ id, email }),
    };
  }
}
