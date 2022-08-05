import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanDto } from './dto/ban.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role]
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepo.findAll({include: {all: true}});
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({where: {email}, include: {all: true}});
    return user;
  }

  async addRole(dto: AddRoleDto) {
      const user = await this.userRepo.findByPk(dto.userId);
      const role = await this.roleService.getRoleByValue(dto.value);
      if (role && user) {
        await user.$add("role", role.id);
        return dto;
      }
      throw new HttpException("Cannot find user or role", HttpStatus.NOT_FOUND)

  }
  async ban(dto: BanDto) {
    const user = await this.userRepo.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("Cannot find user", HttpStatus.NOT_FOUND)
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user
  }
}
