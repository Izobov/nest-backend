import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bycript from "bcryptjs"
import { User } from 'src/users/users.model';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registarte(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bycript.hash(dto.password, 5);
    const newUser = await this.userService.createUser({...dto, password: hashedPassword});
    return this.generateToken(newUser)
}

    generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        }
    }

   async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        const checkPassword = await bycript.compare(dto.password, user?.password);
        if (user && checkPassword) {
            return user
        }

        throw new UnauthorizedException({message: "Uncorrect email or password"})
    }
}
