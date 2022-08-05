import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'User Email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: '1asR@', description: 'User Password' })
  @IsString({ message: 'Should be a string' })
  @Length(16, 4, {
    message: 'Should be at least 4 symbols and no longer than 16',
  })
  readonly password: string;
}
