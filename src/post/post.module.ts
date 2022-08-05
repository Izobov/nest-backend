import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Post } from './post.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule
  ]
})
export class PostModule {}
