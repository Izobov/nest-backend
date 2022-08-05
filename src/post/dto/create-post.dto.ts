import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Post title', description: 'Post title' })
  @IsString({ message: 'Should be a string' })
  readonly title: string;

  @ApiProperty({ example: 'Post content', description: 'Post content' })
  @IsString({ message: 'Should be a string' })
  readonly content: string;

  @ApiProperty({ example: 1, description: 'User Id' })
  @IsNumber({},{ message: 'Should be a number' })
  readonly userId: number;
}
